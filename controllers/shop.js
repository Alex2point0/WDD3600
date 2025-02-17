// constant holding required product location
const Product = require('../models/product')

// export function to get all products
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      })
    })
    .catch(err => {
      console.log(err)
    })
}

// export function to get singular product
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
    //Product.findByPk(prodId) //REMOVED BY AH
  Product.findById(prodId) //ADDED BY AH
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      })
    })
    .catch(err => console.log(err))
}

// export function to get content for shop page
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch(err => {
      console.log(err)
    })
}

// export function to get content for cart page
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      })
    })
    .catch(err => console.log(err))
}

// export function to get content for cart page
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
    //Product.findbyid(prodId)//REMOVED BY AH
  Product.findById(prodId)//ADDED BY AH
   .then(product => { //PLACED ON NEW LINE BY AH
    return req.user.addToCart(product)
  })
    .then(result => {
      console.log(result)
      res.redirect('/cart')
    })
  /*
  let fetchedCart
  let newQuantity = 1
  req.user
    .getCart()
      fetchedCart = cart
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      let product
      if (products.length > 0) {
        product = products[0]
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity
        newQuantity = oldQuantity + 1
        return product
      }
      return Product.findById(prodId)
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      })
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err))
    */
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err))
}
// something
exports.postOrder = (req, res, next) => {
  let fetchedCart
  req.user
    .addOrder()
    .then(result => {
      res.redirect('/orders')
    })
    .catch(err => console.log(err))
}

// export function to get content for orders page
exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      })
    })
    .catch(err => console.log(err))
}
