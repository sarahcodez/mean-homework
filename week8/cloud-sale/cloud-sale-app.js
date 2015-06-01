var app = angular.module('cloudSale', []);

app.controller('mainCtrl', function($scope, apiService) {

	$scope.storeItems = [];

	apiService.getStorefrontPromise.then(function (data) {
		$scope.storeItems = data;
	}, function(error) {
		console.log('Error: ' + error);
	});

	$scope.cartItems = [];

	$scope.subTotal = 0;

	apiService.getCartPromise.then(function (data) {
		var cart = data;
		$scope.cartItems = addPropToCart(cart);
		totalCartItems();
	}, function(error) {
		console.log('Error: ' + error);
	});

	function addPropToCart(cart) {
		for (var i = 0; i < cart.length; i++) {
			var id = cart[i]._id
			var indexInStore = isInArray($scope.storeItems, id);
			cart[i].image = $scope.storeItems[indexInStore].image;
			cart[i].name = $scope.storeItems[indexInStore].name;
			cart[i].price = $scope.storeItems[indexInStore].price;
			}
		
		return cart;

		};


	$scope.addCartItem = function (item) {

		var itemId = item._id;

		var indexInCart = isInArray($scope.cartItems, itemId);

		if(indexInCart >= 0) {

			$scope.cartItems[indexInCart].quantity += 1;

		} else {

			var itemToAdd = {};
			itemToAdd._id = itemId; //$scope.storeItems[index]._id
			itemToAdd.quantity = 1;
			$scope.cartItems.push(itemToAdd);
			addPropToCart($scope.cartItems);

		}

		apiService.updateCart($scope.cartItems);
		totalCartItems();

	};

	$scope.deleteCartItem = function(index) {
		$scope.cartItems.splice(index, 1);
		apiService.updateCart($scope.cartItems);
		totalCartItems();
	};

	function isInArray(array, id) {
		for (var i = 0; i < array.length; i++) {
			if (array[i]._id === id) {
				return i;
			}
		}

		return -1;
	};

	function totalCartItems() {
		var total = 0;
		for (var i = 0; i < $scope.cartItems.length; i++) {
			var price = $scope.cartItems[i].price;
			var qty = $scope.cartItems[i].quantity;
			total += (price * qty);
		}

		$scope.subTotal = total;
	};

});

app.service('apiService', function($http, $q) {
	this.getStorefrontPromise = $q(function(resolve, reject) {
		$http.get('http://mean.codingcamp.us:5555/sarahg/product')
		.success(function(data) {
			resolve(data);
		})
		.error(reject);
	});

	this.getCartPromise = $q(function(resolve, reject) {
		$http.get('http://mean.codingcamp.us:5555/sarahg/cart')
		.success(function(data) {
			resolve(data);
		})
		.error(reject);
	});

	this.updateCart = function(cart) {
		$http.post('http://mean.codingcamp.us:5555/sarahg/cart', cart);
	};

});