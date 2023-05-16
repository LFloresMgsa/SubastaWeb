import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import Cart from "./Cart";

const AddProduct = (props) => {



    const [product, setProduct] = useState({ code: props.location.state.Cab_cCatalogo, name: props.location.state.Cab_cDescripcion, price: props.location.state.Dvd_nImporte, quantity: 1 });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartItems, setCartItems] = useState([]);


    const handleAddToCart = (selectedProduct) => {

        if (selectedProduct) {
            // Copiamos el arreglo del estado actual del carrito
            const cartItemsCopy = [...cartItems];

            // Buscamos si el producto ya está en el carrito
            const index = cartItemsCopy.findIndex((item) => item.Cab_cCatalogo === selectedProduct.Cab_cCatalogo);



            if (index >= 0) {
                // Si el producto ya está en el carrito, aumentamos su cantidad en 1
                cartItemsCopy[index].quantity++;
            } else {
                // Si el producto no está en el carrito, lo agregamos al arreglo del carrito con una cantidad de 1
                cartItemsCopy.push({
                    ...selectedProduct,
                    quantity: 1,
                });
            }

            // Actualizamos el estado del carrito con el arreglo modificado
            //setCartItems(cartItemsCopy);
            setCartItems([...cartItems, cartItemsCopy]);

            // Limpiamos el producto seleccionado
            setSelectedProduct(null);

            console.log(cartItems);

        }
    };



    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //onAddProduct(product);
        setProduct({ code: props.location.state.Cab_cCatalogo, name: props.location.state.Cab_cDescripcion, price: props.location.state.Dvd_nImporte, quantity: 1 });
    };

    return (
        <div>
            <h2>Agregar producto</h2>

            <label htmlFor="code">Codigo del producto:</label>
            <input
                type="text"
                id="code"
                name="code"
                value={product.code}
                onChange={handleInputChange}
            />
            <br />
            <label htmlFor="name">Nombre del producto:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
            />
            <br />
            <label htmlFor="price">Precio:</label>
            <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
            />
            <br />
            <label htmlFor="quantity">Cantidad:</label>
            <input
                type="number"
                id="quantity"
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
            />
            <br />
            <button onClick={() => handleAddToCart(product)}>Agregar al carrito</button>

            <Cart products={cartItems} />

        </div>
    );
};

export default AddProduct;
