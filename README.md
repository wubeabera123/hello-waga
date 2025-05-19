# Waga API

A Django REST API for managing products, categories, pricing, company accounts, user roles, and system settings.

---

## Table of Contents

- [Overview](#overview)
- [API Endpoints](#api-endpoints)
  - [Product & Pricing](#product--pricing)
  - [Core Settings](#core-settings)
  - [Account Management](#account-management)
- [Authentication](#authentication)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The Waga API provides endpoints for:
- Product and category management
- Dynamic product attributes and pricing
- Company and user account management
- Role-based access control
- System settings and data lookups

Built with Django and Django REST Framework using viewsets, filters, and custom access policies.

---

## API Endpoints

### Product & Pricing

| Path                       | Methods         | Description                              | Permissions                        |
|----------------------------|-----------------|------------------------------------------|------------------------------------|
| `/products/`               | GET, PATCH, DELETE | List, update, or delete products         | ProductAccessPolicy                |
| `/form-metadata/`          | GET             | List product category attributes         | ProductCategoryAttributeAccessPolicy|
| `/set-price/`              | POST            | Set product pricing                      | ProductAccessPolicy                |
| `/categories/`             | GET             | List product categories                  | CategoryAccessPolicy               |

#### Example: GET `/products/`
Returns a list of products with filtering support.

#### Example: POST `/set-price/`
Sets the price for a product. Requires payload as per `ProductPriceSetSerializer`.

---

### Core Settings

| Path                    | Methods         | Description                                   | Permissions               |
|-------------------------|-----------------|-----------------------------------------------|---------------------------|
| `/datalookups/`         | GET             | List all data lookups                         | AllowAny                  |
| `/lookup-types/`        | GET             | List unique data lookup types                 | DataLookupAccessPolicy    |
| `/system-settings/`     | GET, POST, PATCH| List, create, or update system settings       | SystemSettingAccessPolicy |
| `/system-settings/{id}/reset/` | PATCH    | Reset system setting to default value         | SystemSettingAccessPolicy |

---

### Account Management

| Path                        | Methods         | Description                                   | Permissions                  |
|-----------------------------|-----------------|-----------------------------------------------|------------------------------|
| `/roles/`                   | GET             | List user roles                               | AllowAny                     |
| `/users/`                   | GET, POST, PATCH, DELETE | Manage users                            | UserAccessPolicy              |
| `/company-profile/`         | GET, POST, PATCH| Manage company profiles                       | CompanyProfileAccessPolicy    |
| `/change-password/`         | POST            | Change user password, returns new JWT tokens  | IsAuthenticated              |

#### Example: POST `/change-password/`
Request payload:
```json
{
  "old_password": "currentPass123",
  "new_password": "newSecurePass456"
}
```
Response contains new JWT access and refresh tokens.

---

## Authentication

- Most endpoints require authentication via JWT tokens.
- Obtain tokens via your project's authentication endpoints (not shown in the provided code).
- Supply tokens via the `Authorization: Bearer <token>` header.

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/wubeabera123/hello-waga.git
   cd hello-waga
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Apply migrations:**
   ```bash
   python manage.py migrate
   ```

4. **Run the server:**
   ```bash
   python manage.py runserver
   ```

---

## Running Tests

```bash
python manage.py test
```

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## License

MIT License

---

*Generated from actual API code. For further details, see code in `apps/price/`, `apps/core/`, and `apps/account/` directories.*
