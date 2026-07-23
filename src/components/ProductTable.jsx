import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ref, set, remove } from 'firebase/database';
import { database } from '../firebase';
import { toast } from 'react-toastify';
import './ProductTable.css';

const ProductTable = () => {
  const { products, loading } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ uid: '', name: '', price: '', category: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.uid || !formData.name || !formData.price || !formData.category) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const productRef = ref(database, `/products/${formData.uid}`);
      await set(productRef, {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category
      });

      toast.success(editingProduct ? 'Product updated!' : 'Product added!');
      setFormData({ uid: '', name: '', price: '', category: '' });
      setIsAdding(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product.uid);
    setFormData({
      uid: product.uid,
      name: product.name,
      price: product.price.toString(),
      category: product.category
    });
    setIsAdding(true);
  };

  const handleDelete = async (uid) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    try {
      const productRef = ref(database, `/products/${uid}`);
      await remove(productRef);
      toast.success('Product deleted!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingProduct(null);
    setFormData({ uid: '', name: '', price: '', category: '' });
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="product-table-container">
      <div className="table-header">
        <h2>Product Manager</h2>
        {!isAdding && (
          <button className="add-button" onClick={() => setIsAdding(true)}>
            + Add Product
          </button>
        )}
      </div>

      {isAdding && (
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              placeholder="RFID Tag / UID"
              value={formData.uid}
              onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
              disabled={!!editingProduct}
              required
            />
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button">
              {editingProduct ? 'Update' : 'Add'}
            </button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No products added yet. Click "Add Product" to get started.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>RFID Tag</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.uid}>
                  <td><code>{product.uid}</code></td>
                  <td>{product.name}</td>
                  <td>₹{product.price?.toFixed(2)}</td>
                  <td><span className="category-badge">{product.category}</span></td>
                  <td>
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(product)}
                    >
                      ✏️
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(product.uid)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
