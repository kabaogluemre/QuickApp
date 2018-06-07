"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var roleService_1 = require("../../services/roleService");
var RoleDto_1 = require("../../models/role/RoleDto");
var base_component_1 = require("@shared/base.component");
var CreateRoleComponent = /** @class */ (function (_super) {
    __extends(CreateRoleComponent, _super);
    function CreateRoleComponent(roleService, injector) {
        var _this = _super.call(this, injector) || this;
        _this.roleService = roleService;
        _this.role = new RoleDto_1.RoleDto();
        _this.isEdit = false;
        _this.tree = null;
        return _this;
    }
    CreateRoleComponent.prototype.ngOnInit = function () {
    };
    CreateRoleComponent.prototype.addTreeDataRecursively = function (permission, data) {
        var childs = this.role.GrantedPermissions.filter(function (x) { return x.ParentName === permission['Name']; });
        for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
            var child = childs_1[_i];
            var nodeData = {
                "id": child['Name'],
                "text": this.loc(child['Name']),
                "state": {
                    "selected": child['Granted'],
                    "opened": true
                },
                "type": child['ChildrenCount'] > 0 ? 'folder' : 'lock',
                "children": []
            };
            data.children.push(nodeData);
            this.addTreeDataRecursively(child, nodeData);
        }
    };
    CreateRoleComponent.prototype.createRolePermissionTree = function () {
        var treeData = [];
        var rootPermission = this.role.GrantedPermissions.filter(function (x) { return x.ParentName == ""; })[0]; //root
        var root = {
            "id": rootPermission['Name'],
            "text": this.loc(rootPermission['Name']),
            "state": {
                "selected": rootPermission['Granted'],
                "opened": true
            },
            "type": rootPermission['ChildrenCount'] > 0 ? 'folder' : 'lock',
            "children": []
        };
        this.addTreeDataRecursively(rootPermission, root);
        treeData.push(root);
        this.tree = $('#roleTree').jstree({
            'core': {
                'multiple': true,
                'data': treeData
            },
            'types': {
                'lock': { 'icon': 'fa fa-lock' },
                'folder': {
                    'icon': 'fa fa-folder'
                }
            },
            'checkbox': {
                'three_state': false,
                'cascade': ""
            },
            "plugins": ["wholerow", "checkbox", "types", "search"]
        }).on("changed.jstree", function (e, data) {
            var childrenNodes = [];
            var $roleTree = $('#roleTree');
            if (data.node && data.node.state.selected) {
                var parentNode = $roleTree.jstree('get_parent', data.node);
                while (parentNode != "") {
                    $roleTree.jstree('select_node', parentNode, true);
                    parentNode = $roleTree.jstree('get_parent', parentNode);
                }
                childrenNodes = $.makeArray($roleTree.jstree('get_children_dom', data.node));
                $roleTree.jstree('select_node', childrenNodes);
            }
            else {
                childrenNodes = $.makeArray($roleTree.jstree('get_children_dom', data.node));
                $roleTree.jstree('deselect_node', childrenNodes);
            }
        });
    };
    CreateRoleComponent.prototype.save = function () {
        var grantedPermissions = this.getGrantedPermissions();
        this.roleService.CreateRole(this.role, grantedPermissions)
            .subscribe(function (result) {
            location.reload();
        });
    };
    ;
    CreateRoleComponent.prototype.setRole = function (roleId) {
        var _this = this;
        if (roleId != null) {
            this.roleService.GetRole(roleId)
                .subscribe(function (result) {
                _this.role = result.Role;
                _this.isEdit = true;
                _this.createRolePermissionTree();
            });
        }
        else {
            this.roleService.GetPermissions()
                .subscribe(function (result) {
                _this.role.GrantedPermissions = result.Permissions;
                _this.createRolePermissionTree();
            });
        }
    };
    CreateRoleComponent.prototype.setRoleAsEmpty = function () {
        if (this.tree != null) {
            $('#roleTree').jstree("destroy").empty();
        }
        this.role = new RoleDto_1.RoleDto();
        this.isEdit = false;
    };
    CreateRoleComponent.prototype.getGrantedPermissions = function () {
        var selectedPermissions = $("#roleTree").jstree().get_selected(true);
        var grandtedPermissions = [];
        for (var i = 0; i < selectedPermissions.length; i++) {
            grandtedPermissions.push(selectedPermissions[i].original.id);
        }
        return grandtedPermissions;
    };
    CreateRoleComponent = __decorate([
        core_1.Component({
            selector: 'create-role-form',
            templateUrl: '/src/app/roles/createrole/createrole.component.html'
        }),
        __metadata("design:paramtypes", [roleService_1.RoleService, core_1.Injector])
    ], CreateRoleComponent);
    return CreateRoleComponent;
}(base_component_1.BaseComponent));
exports.CreateRoleComponent = CreateRoleComponent;
//# sourceMappingURL=createrole.component.js.map