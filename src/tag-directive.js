/**
 * Created by cemre.cevik on 23.12.2015.
 */
(function () {
    'use strict';

    angular.module('draggable-tag', [])
        .factory('tagService', tagService)
        .directive('draggableTag', ['tagService', '$sce', draggableTag])
        .directive('tagContainer', ['tagService', tagContainer]);

    function tagService() {
        return {
            dragState: false
        };
    }

    function tagContainer(tagService) {
        return {
            restrict: 'E',
            templateUrl: 'container.html',
            scope: {
                tags: '=ngModel',
                disabled: '=ngDisabled',
                keep: '=staticList'
            },
            link: function ($scope, element, attributes) {
                element.on('dragover', function (ev) {
                    ev.dataTransfer.dropEffect = 'copy';
                    ev.preventDefault();
                });
                element.on('drop', function (ev) {
                    tagService.dragState = true;
                    var data = ev.dataTransfer.getData("Text");
                    $scope.$apply(function () {
                        var tag = angular.fromJson(data);
                        $scope.tags.push(tag);
                    });
                });
            },
            controller: function ($scope) {
                this.removeTag = function (index) {
                    if (!$scope.keep) {
                        $scope.$apply(function () {
                            $scope.tags.splice(index, 1);
                        });
                    }
                };
            }
        };
    }

    function draggableTag(tagService, $sce) {
        return {
            restrict: 'E',
            templateUrl: 'tag-directive.html',
            require: '^tagContainer',
            scope: {
                value: '=ngModel',
                draggableModel: '=',
                disabled: '=ngDisabled',
                group: '=groupCode',
                likes: '=',
                dislikes: '=',
                experts: '='
            },
            link: function ($scope, element, attributes, tagsController) {
                var validDrop = false;
                $scope.showGroup = ($scope.group !== null);
                $scope.groupCode = $sce.trustAsHtml($scope.group);
                element.on('dragstart', function (ev) {
                    tagService.dragState = false;
                    var tag = angular.toJson($scope.draggableModel);
                    ev.dataTransfer.setData("Text", tag);
                });
                element.on('dragend', function (ev) {
                    if (tagService.dragState) {
                        tagsController.removeTag($scope.$parent.$index);
                    }
                });
            }
        };
    }
})();