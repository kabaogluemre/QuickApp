import { Component, ViewChild, EventEmitter, Output, Injector,OnInit } from '@angular/core';
import { RoleService } from '../../services/roleService';

import { RoleDto } from '../../models/role/RoleDto';

import { PermissionDto } from "@shared/models/session/permissionDto";

import { BaseComponent } from '@shared/base.component';

import { NotificationConfig } from '@shared/models/notification/notificationConfig';
import { NotificationType } from '@shared/enums/notificationType';
import { NotificationService } from '@shared/services/notificationService'
import { GetPermissionsOutput } from '../../models/role/GetPermissionsOutput'
import Core = require("@angular/core");
declare var $: any;

@Component({
    selector: 'create-role-form',
    templateUrl: '/src/app/roles/createrole/createrole.component.html'
})
export class CreateRoleComponent extends BaseComponent implements OnInit {

    role: RoleDto = new RoleDto();
    isEdit: boolean = false;
    tree:any = null;

    constructor(private roleService: RoleService, injector: Injector) {
        super(injector);
    }
    ngOnInit(): void {

    }
    private addTreeDataRecursively(permission: PermissionDto, data: any): any {
        var childs = this.role.GrantedPermissions.filter(x => x.ParentName === permission['Name']);
        for (let child of childs) {
            var nodeData = {
                "id": child['Name'],
                "text": this.loc(child['Name']),
                "state": {
                    "selected": child['Granted'],
                    "opened": true
                },
                "type": child['ChildrenCount'] > 0 ? 'folder' : 'lock',
                "children": <any>[]
            };
            data.children.push(nodeData);
            this.addTreeDataRecursively(child, nodeData);
        }
    }
    createRolePermissionTree() {
        let treeData: any = [];
        let rootPermission = this.role.GrantedPermissions.filter(x => x.ParentName == "")[0];//root
        var root = {
            "id": rootPermission['Name'],
            "text": this.loc(rootPermission['Name']),
            "state": {
                "selected": rootPermission['Granted'],
                "opened":true
            },
            "type": rootPermission['ChildrenCount'] > 0 ? 'folder' : 'lock',
            "children":<any>[]
        };
        this.addTreeDataRecursively(rootPermission, root);
        treeData.push(root);
        this.tree = $('#roleTree').jstree({
            'core': {
                'multiple': true,
                'data': treeData
            },
            'types': {
                'lock': { 'icon': 'fa fa-lock'},
                'folder': {
                    'icon': 'fa fa-folder'
                }
            },
            'checkbox': {
                'three_state': false,
                'cascade': ""
            },
            "plugins": ["wholerow", "checkbox", "types","search"]
        }).on("changed.jstree", function (e: any, data:any) {
            var childrenNodes = <any>[];
            var $roleTree = $('#roleTree');
            if (data.node && data.node.state.selected) {
                var parentNode = $roleTree.jstree('get_parent', data.node);
                while (parentNode != "") {
                    $roleTree.jstree('select_node', parentNode, true);
                    parentNode = $roleTree.jstree('get_parent', parentNode);
                }
                childrenNodes = $.makeArray($roleTree.jstree('get_children_dom', data.node));
                $roleTree.jstree('select_node', childrenNodes);

            } else {
                childrenNodes = $.makeArray($roleTree.jstree('get_children_dom', data.node));
                $roleTree.jstree('deselect_node', childrenNodes);
            }
        });
    }
    save(): void {
        var grantedPermissions = this.getGrantedPermissions();
        this.roleService.CreateRole(this.role,grantedPermissions)
            .subscribe(
                result => {
                    location.reload();
                });
    };
    setRole(roleId?: number): void {
        if (roleId != null) {
            this.roleService.GetRole(roleId)
                .subscribe(
                    result => {
                        this.role = result.Role;
                        this.isEdit = true;
                        this.createRolePermissionTree();
                    });
        } else {
            this.roleService.GetPermissions()
                .subscribe(
                    result => {
                        this.role.GrantedPermissions = result.Permissions;
                        this.createRolePermissionTree();
                    });
        }
    }
    setRoleAsEmpty(): void {
        if (this.tree != null) {
            $('#roleTree').jstree("destroy").empty();
        }
        this.role = new RoleDto();
        this.isEdit = false;
    }
    private getGrantedPermissions(): string[] {
        var selectedPermissions = $("#roleTree").jstree().get_selected(true);
        var grandtedPermissions = <string[]>[];
        for (var i = 0; i < selectedPermissions.length; i++) {
            grandtedPermissions.push(selectedPermissions[i].original.id);
        }
        return grandtedPermissions;
    }
}