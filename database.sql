CREATE SCHEMA dbo AUTHORIZATION postgres;

-- dbo.users definition
-- Drop table
-- DROP TABLE dbo.users;
CREATE TABLE dbo.users (
  id serial4 NOT NULL,
  "name" varchar(200) NOT NULL,
  email varchar(200) NOT NULL,
  "password" varchar(255) NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  CONSTRAINT users_email_key UNIQUE (email),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- dbo.user_tokens definition
-- Drop table
-- DROP TABLE dbo.user_tokens;
CREATE TABLE dbo.user_tokens (
  id serial4 NOT NULL,
  user_id int4 NOT NULL,
  refresh_token varchar(600) NOT NULL,
  expires_date timestamp NOT NULL,
  CONSTRAINT user_tokens_pkey PRIMARY KEY (id)
);

CREATE TABLE dbo.clients (
  id serial4 NOT NULL,
  "name" varchar NOT NULL,
  street varchar NOT NULL,
  neighborhood varchar NOT NULL,
  city varchar NOT NULL,
  state varchar NOT NULL,
  zip_code varchar NOT NULL,
  complement varchar NOT NULL,
  status varchar NOT NULL,
  created_at timestamp NOT NULL,
  updated_at timestamp NOT NULL,
  user_created_at int4 NOT NULL,
  user_updated_at int4 NOT NULL,
  CONSTRAINT clients_pkey PRIMARY KEY (id)
);

-- dbo.products definition
-- Drop table
-- DROP TABLE dbo.products;
CREATE TABLE dbo.products (
  id serial4 NOT NULL,
  description varchar(255) NOT NULL,
  unit_value numeric(10, 2) NOT NULL,
  unit_of_measurement varchar(20) NOT NULL,
  status varchar(20) NOT NULL,
  created_at timestamp NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  user_created_at int4 NULL,
  user_updated_at int4 NOT NULL,
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_status_check CHECK (
    (
      (status) :: text = ANY (
        (
          ARRAY ['active'::character varying, 'inactive'::character varying, 'in construction'::character varying]
        ) :: text []
      )
    )
  )
);

-- dbo.orders definition
-- Drop table
-- DROP TABLE dbo.orders;
CREATE TABLE dbo.orders (
  id serial4 NOT NULL,
  client_id int4 NOT NULL,
  status varchar(20) NOT NULL,
  created_at timestamp NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  user_created_at int4 NULL,
  user_updated_at int4 NOT NULL,
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_status_check CHECK (
    (
      (status) :: text = ANY (
        (
          ARRAY ['active'::character varying, 'inactive'::character varying, 'in construction'::character varying]
        ) :: text []
      )
    )
  )
);

-- dbo.order_products definition
-- Drop table
-- DROP TABLE dbo.order_products;
CREATE TABLE dbo.order_products (
  id serial4 NOT NULL,
  order_id int4 NOT NULL,
  product_id int4 NOT NULL,
  quantity int4 NOT NULL,
  status varchar(20) NOT NULL,
  created_at timestamp NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now(),
  user_created_at int4 NULL,
  user_updated_at int4 NOT NULL,
  unit_value numeric(10, 2) NOT NULL,
  CONSTRAINT order_products_pkey PRIMARY KEY (id),
  CONSTRAINT order_products_status_check CHECK (
    (
      (status) :: text = ANY (
        (
          ARRAY ['active'::character varying, 'inactive'::character varying, 'in construction'::character varying]
        ) :: text []
      )
    )
  )
);

-- dbo.order_products foreign keys
ALTER TABLE
  dbo.order_products
ADD
  CONSTRAINT order_products_order_id_fkey FOREIGN KEY (order_id) REFERENCES dbo.orders(id);

ALTER TABLE
  dbo.order_products
ADD
  CONSTRAINT order_products_product_id_fkey FOREIGN KEY (product_id) REFERENCES dbo.products(id);

-- dbo.orders foreign keys
ALTER TABLE
  dbo.orders
ADD
  CONSTRAINT orders_client_id_fkey FOREIGN KEY (client_id) REFERENCES dbo.clients(id);

INSERT INTO
  users ("name", email, "password", created_at)
VALUES
  (
    'User Test',
    'admin@email.com',
    '$2a$10$e3xr0QzniceU1.omg0ViFOzcFIm3lqvoYerV5S7if6TSnvu0LF6lG',
    '2023-03-16 21:59:55'
  );
