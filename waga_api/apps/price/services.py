from typing import Any
from django.db import transaction
from apps.price.models import ProductAttribute


class PriceSetService:
    """A service layer for handling daily Product price set.

    Returns:
        dict: returns a recorded product, its attributes, and response status.
    """

    @staticmethod
    @transaction.atomic
    def set_price(payload) -> dict[str, Any]:
        product = payload["product"]
        product_category = payload["product_category"]
        attributes = payload["attributes"]
        try:
            # product.update_price(price, is_for_sale)
            product_attributes = PriceSetService.update_product_attributes(
                product, attributes
            )

            return {
                "product": product,
                "product_category": product_category,
                "attributes": product_attributes
            }
        except Exception as e:
            raise e

    @staticmethod
    def update_product_attributes(product, attributes) -> list[Any]:
        # product_attributes = {attr.field_name: attr for attr in product.product_attributes.all()}
        product_attributes = [
            ProductAttribute(product=product, field_name=name, field_value=value)
            for name, value in attributes.items()
        ]
        # for name, value in attributes.items():
        #     product_attributes["field_name"] = name
        #     product_attributes["field_value"] = value

        print("#####", product_attributes)

        ProductAttribute.objects.bulk_create(product_attributes)

        return attributes
