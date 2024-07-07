import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ProductManager.module.css";
import AddProduct from "./AddProduct";
import MenuAdmin from "../MenuAdmin/MenuAdmin"
const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        size: '',
        cost: '',
        quantity: '',
        inform: '',
        glossiness: '',
        category: '',
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8081/getListProduct");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleDeleteProduct = async (productCode) => {
        try {
            const result = window.confirm(`Sản phẩm có productId: ${productCode} + sẽ bị xóa.`);
            if (result) {
                await axios.delete(`http://localhost:8081/deleteProduct/${productCode}`);
                setProducts(products.filter((product) => product.product_code !== productCode));
                alert("Xóa sản phẩm thành công");
            }

        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Đã xảy ra lỗi khi xóa sản phẩm");
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product.product_code);
        setFormData(product);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateProduct = async () => {
        try {
            await axios.put(`http://localhost:8081/updateProduct/${editingProduct}`, formData);
            setProducts(products.map((product) =>
                product.product_code === editingProduct ? { ...product, ...formData } : product
            ));
            setEditingProduct(null);
            alert("Cập nhật sản phẩm thành công");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Đã xảy ra lỗi khi cập nhật sản phẩm");
        }
    };

    return (
        <div class={styles.siteProductManger}>
            <MenuAdmin></MenuAdmin>
            <div className={styles.productList}>
                <h2>Danh sách sản phẩm</h2>
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Size</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Thông tin</th>
                            <th>Bóng</th>
                            <th>Loại</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.product_code}</td>
                                <td>{product.name}</td>
                                <td>{product.size}</td>
                                <td>{product.cost}</td>
                                <td>{product.quantity}</td>
                                <td>{product.inform}</td>
                                <td>{product.glossiness}</td>
                                <td>{product.category}</td>
                                <td>
                                    <button onClick={() => handleEditProduct(product)}>Sửa</button>
                                    <button onClick={() => handleDeleteProduct(product.product_code)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {editingProduct && (
                    <div className={styles.editForm}>
                        <h2>Chỉnh sửa sản phẩm</h2>
                        <input
                            name="name"
                            placeholder="Tên sản phẩm"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            name="size"
                            placeholder="Size"
                            value={formData.size}
                            onChange={handleInputChange}
                        />
                        <input
                            name="cost"
                            placeholder="Giá"
                            value={formData.cost}
                            onChange={handleInputChange}
                        />
                        <input
                            name="quantity"
                            placeholder="Số lượng"
                            value={formData.quantity}
                            onChange={handleInputChange}
                        />
                        <input
                            name="inform"
                            placeholder="Thông tin"
                            value={formData.inform}
                            onChange={handleInputChange}
                        />
                        <input
                            name="glossiness"
                            placeholder="Bóng"
                            value={formData.glossiness}
                            onChange={handleInputChange}
                        />
                        <input
                            name="category"
                            placeholder="Loại"
                            value={formData.category}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleUpdateProduct}>Cập nhật</button>
                        <button className={styles.buttonCancel} onClick={() => setEditingProduct(null)}>Hủy</button>
                    </div>
                )}

                <h2>Thêm sản phẩm</h2>
                <AddProduct></AddProduct>
            </div>
        </div>
    );
};

export default ProductManager;
