# Product Database Design Documentation

## 1. Overview

This document outlines the database design decisions for managing diverse product categories, including vehicles, electronics, machinery, and food items. The system uses a **key-value pair** approach for storing dynamic product attributes efficiently.

## 2. Design Goals

- **Flexibility**: Support a wide range of product categories with different attributes.
- **Scalability**: Ensure performance remains optimal as data grows.
- **Minimal Duplication**: Reduce redundant storage of common attribute values.
- **Ease of Querying**: Enable efficient filtering and retrieval of product data.

## 3. Database Schema

### **3.1 Products Table**

Stores common product details that apply to all categories.

| Column       | Type         | Description |
|-------------|-------------|-------------|
| id          | SERIAL (PK)  | Unique product identifier |
| name        | VARCHAR(255) | Product name |
| category_id | INT (FK)     | Links to Categories table |
| price       | DECIMAL(10,2) | Product selling price |
| price_max   | DECIMAL(10,2) | Maximum price range |
| listing_type | ENUM('sell', 'rent') | Indicates sale/rental type |

### **3.2 CategoryAttributes Table**

Defines the possible attributes for each category.

| Column       | Type         | Description |
|-------------|-------------|-------------|
| id          | SERIAL (PK)  | Unique attribute identifier |
| category_id | INT (FK)     | Links to Categories table |
| field_name  | VARCHAR(255) | Name of the attribute (e.g., 'brand', 'storage') |
| field_type  | VARCHAR(50)  | Data type (string, integer, etc.) |
| form_type   | VARCHAR(50)  | UI type (dropdown, text, number) |
| required    | BOOLEAN      | Whether the field is mandatory |

### **3.3 ProductAttributes Table**

Links products to attribute values using a key-value structure.

| Column       | Type         | Description |
|-------------|-------------|-------------|
| id          | SERIAL (PK)  | Unique identifier |
| product_id  | INT (FK)     | Links to Products table |
| attribute_id | INT (FK)    | Links to CategoryAttributes table |
| value       | VARCHAR(255) | Stores the actual attribute value |

## 4. Data Flow

### **Product Registration**

1. User selects a category (e.g., Electronics).
2. System retrieves predefined attributes for the category from `CategoryAttributes`.
3. User inputs values for each attribute.
4. Product details and attributes are stored in `Products` and `ProductAttributes`.

### **Querying Products with Attributes**

To fetch a product with its attributes:

```sql
SELECT p.id, p.name, p.price_min, p.price_max,
       ca.field_name, pa.value
FROM Products p
JOIN ProductAttributes pa ON p.id = pa.product_id
JOIN CategoryAttributes ca ON pa.attribute_id = ca.id
WHERE p.id = ?;
```

## 5. Pros & Cons

### **Pros:**

- Simplifies storage by eliminating redundant attribute value references.
- Allows easy filtering by attribute values.
- Flexible for adding new attributes dynamically.

### **Cons:**

- Potential increase in storage due to repeated values.
- Requires string-based filtering for certain attributes.

## 6. Alternatives Considered

### **1. Storing Attributes in JSON**

- **Pros:** Simple and requires fewer tables.
- **Cons:** Harder to query and filter attributes efficiently.

### **2. Separate Columns for Each Attribute**

- **Pros:** Easier to query directly.
- **Cons:** Not scalable for categories with different attributes.

## 7. Future Improvements

- Index optimization for faster queries.
- Implement caching for frequently accessed product attributes.
- Add support for attribute versioning to track changes.

---
This document provides a structured foundation for the product database design. It ensures flexibility, efficiency, and maintainability as the system scales.
