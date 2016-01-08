/**
 * Created by cemre.cevik on 23.12.2015.
 */
(function () {
    'use strict';

    angular.module('app', ['draggable-tag']);

})();

(function() {
    'use strict';

    angular.module('app').controller('testController', ['$scope', testController]);
      
    function testController($scope)
    {
        $scope.skills1 = [
          { Name: 'Test 1', Group: 'source1', Likes: 1, Dislikes: 2, Experts: 3},
          { Name: 'Test 2', Group: 'source2', Likes: 1, Dislikes: 2, Experts: 3},
          { Name: 'Test 3', Group: 'source2', Likes: 1, Dislikes: 2, Experts: 3},
          { Name: 'Test 4', Likes: 1, Dislikes: 2, Experts: 3}
        ];
        $scope.skills2 = [
            { Name: 'Test 5', Group: 'source2', Likes: 1, Dislikes: 2, Experts: 3}
        ];
    }
})();
