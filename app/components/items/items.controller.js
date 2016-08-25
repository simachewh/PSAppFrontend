/**
 * Created by Simachew on 26-Jul-16.
 */
(function () {
    angular
        .module("psApp")
        .controller("ItemsController", ["itemFactory", ItemsController])
        .controller("ItemCreatController", ["itemFactory", ItemCreateController])
        .controller("ItemEditController", ["$routeParams", "itemFactory", ItemEditController]);

    /**
     *
     * @param itemFactory
     * @constructor
     */
    function ItemsController(itemFactory) {
        var vm = this;
        vm.processing = true;
        vm.items = {};
        vm.selectedItem;
        vm.selectedIndex = 0;
        vm.select = select;

        function select(item, index) {
            vm.selectedItem = item;
            vm.selectedIndex = index;
        };

        /**
         * Grab all itmes on page load
         * todo: should be paginated or sorted.
         */
        itemFactory.getAll()
            .success(function (data) {
                vm.processing = false;
                vm.items = data;
            })
            .error(function (data, status) {
                //todo: better error handeling.
                console.log("Response ERR: ", status, data);
            });
    };

    /**
     *
     * @param itemFactory
     * @constructor
     */
    function ItemCreateController(itemFactory) {

    };

    /**
     *
     * @param $routeProvider
     * @param itemFactory
     * @constructor
     */
    function ItemEditController($routeProvider, itemFactory) {

    };
})();