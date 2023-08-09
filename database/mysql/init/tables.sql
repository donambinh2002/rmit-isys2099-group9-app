CREATE DATABASE IF NOT EXISTS isys2099_group9_app;
USE isys2099_group9_app;


CREATE TABLE IF NOT EXISTS wh_admin
(
    username      VARCHAR(45),
    password_hash VARCHAR(255) NOT NULL,
    CONSTRAINT lazada_user_pk PRIMARY KEY (username)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS lazada_user
(
    username      VARCHAR(45),
    password_hash VARCHAR(255) NOT NULL,
    CONSTRAINT lazada_user_pk PRIMARY KEY (username)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS buyer
(
    username VARCHAR(45),
    CONSTRAINT buyer_pk PRIMARY KEY (username),
    CONSTRAINT buyer_username_fk FOREIGN KEY (username) REFERENCES lazada_user (username)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS seller
(
    username  VARCHAR(45),
    shop_name VARCHAR(45) NOT NULL,
    CONSTRAINT seller_pk PRIMARY KEY (username),
    CONSTRAINT seller_shop_name_un UNIQUE (shop_name),
    CONSTRAINT seller_username_fk FOREIGN KEY (username) REFERENCES lazada_user (username)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS warehouse
(
    id             INT AUTO_INCREMENT,
    warehouse_name VARCHAR(45) NOT NULL,
    volume         INT         NOT NULL,  -- Cubic centimeter
    province       VARCHAR(45) NOT NULL,
    city           VARCHAR(45) NOT NULL,
    district       VARCHAR(45),
    street         VARCHAR(45),
    streetNumber   VARCHAR(10),
    CONSTRAINT warehouse_pk PRIMARY KEY (id),
    CONSTRAINT warehouse_warehouse_name_un UNIQUE (warehouse_name),
    CONSTRAINT chk_warehouse CHECK (volume > 0)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS product_category
(
    category_name VARCHAR(45),
    parent        VARCHAR(45) DEFAULT NULL,
    CONSTRAINT product_category_pk PRIMARY KEY (category_name),
    CONSTRAINT product_category_parent_fk FOREIGN KEY (parent) REFERENCES product_category (category_name)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS product_attribute
(
    attribute_name VARCHAR(45),
    CONSTRAINT product_attribute_pk PRIMARY KEY (attribute_name)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS product_category_attribute_association
(
    category VARCHAR(45),
    attribute VARCHAR(45),
    CONSTRAINT product_category_attribute_association_pk PRIMARY KEY (category, attribute),
    CONSTRAINT product_category_attribute_association_category_fk FOREIGN KEY (category) REFERENCES product_category (category_name),
    CONSTRAINT product_category_attribute_association_attribute_fk FOREIGN KEY (attribute) REFERENCES product_attribute (attribute_name)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS product
(
    id                  INT AUTO_INCREMENT,
    title               VARCHAR(45) NOT NULL,
    product_description TEXT,
    category            VARCHAR(45),
    image               BLOB,
    price               DECIMAL(6, 2),
    width               INT         NOT NULL,  -- Centimeter
    length              INT         NOT NULL,  -- Centimeter
    height              INT         NOT NULL,  -- Centimeter
    warehouse_id        INT NOT NULL,
    stock_quantity      INT NOT NULL DEFAULT 0,
    seller              VARCHAR(45) NOT NULL,
    CONSTRAINT product_pk PRIMARY KEY (id),
    CONSTRAINT product_category_fk FOREIGN KEY (category) REFERENCES product_category(category_name),
    CONSTRAINT product_warehouse_id_fk FOREIGN KEY (warehouse_id) REFERENCES warehouse(id),
    CONSTRAINT product_seller_fk FOREIGN KEY (seller) REFERENCES seller(username),
    CONSTRAINT chk_product CHECK (price > .0 AND width > 0 AND length > 0 AND height > 0 AND stock_quantity >= 0)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS inbound_order
(
    id             INT AUTO_INCREMENT,
    quantity       INT NOT NULL,
    product_id     INT NOT NULL,
    created_date   DATE NOT NULL,
    created_time   TIME NOT NULL,
    fulfilled_date DATE DEFAULT NULL,
    fulfilled_time TIME DEFAULT NULL,
    seller         VARCHAR(45),
    CONSTRAINT inbound_order_pk PRIMARY KEY (id),
    CONSTRAINT inbound_order_product_id_fk FOREIGN KEY (product_id) REFERENCES product (id),
    CONSTRAINT inbound_order_seller_fk FOREIGN KEY (seller) REFERENCES seller (username),
    CONSTRAINT chk_inbound_order_quantity CHECK (quantity > 0),
    CONSTRAINT chk_inbound_order_datetime CHECK
        (
            (
                created_date < fulfilled_date OR
                (created_date = fulfilled_date AND created_time < fulfilled_time)
            )
            AND
            (
                (fulfilled_date IS NULL AND fulfilled_time IS NULL) OR
                (fulfilled_date IS NOT NULL AND fulfilled_time IS NOT NULL)
            )
        )
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS buyer_order
(
    id             INT AUTO_INCREMENT,
    quantity       INT NOT NULL,
    product_id     INT NOT NULL,
    created_date   DATE NOT NULL,
    created_time   TIME NOT NULL,
    fulfilled_date DATE DEFAULT NULL,
    fulfilled_time TIME DEFAULT NULL,
    buyer          VARCHAR(45),
    CONSTRAINT buyer_order_pk PRIMARY KEY (id),
    CONSTRAINT buyer_order_product_id_fk FOREIGN KEY (product_id) REFERENCES product (id),
    CONSTRAINT buyer_order_buyer_fk FOREIGN KEY (buyer) REFERENCES buyer (username),
    CONSTRAINT chk_buyer_order_quantity CHECK (quantity > 0),
    CONSTRAINT chk_order_datetime CHECK
        (
            (
                created_date < fulfilled_date OR
                (created_date = fulfilled_date AND created_time < fulfilled_time)
            )
            AND
            (
                (fulfilled_date IS NULL AND fulfilled_time IS NULL) OR
                (fulfilled_date IS NOT NULL AND fulfilled_time IS NOT NULL)
            )
        )
) ENGINE = InnoDB;
