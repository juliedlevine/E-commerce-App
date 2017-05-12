--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: Julie
--

CREATE SEQUENCE product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE product_id_seq OWNER TO "Julie";

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: products; Type: TABLE; Schema: public; Owner: Julie
--

CREATE TABLE products (
    id integer NOT NULL,
    name character varying,
    price integer,
    description text,
    envelope_dimension text,
    card_dimension text,
    stock_count integer,
    image_url text
);


ALTER TABLE products OWNER TO "Julie";

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: Julie
--

CREATE SEQUENCE products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE products_id_seq OWNER TO "Julie";

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Julie
--

ALTER SEQUENCE products_id_seq OWNED BY products.id;


--
-- Name: products_purchases; Type: TABLE; Schema: public; Owner: Julie
--

CREATE TABLE products_purchases (
    id integer NOT NULL,
    purchase_id integer,
    product_id integer
);


ALTER TABLE products_purchases OWNER TO "Julie";

--
-- Name: products_purchases_id_seq; Type: SEQUENCE; Schema: public; Owner: Julie
--

CREATE SEQUENCE products_purchases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE products_purchases_id_seq OWNER TO "Julie";

--
-- Name: products_purchases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Julie
--

ALTER SEQUENCE products_purchases_id_seq OWNED BY products_purchases.id;


--
-- Name: purchases; Type: TABLE; Schema: public; Owner: Julie
--

CREATE TABLE purchases (
    id integer NOT NULL,
    user_id integer
);


ALTER TABLE purchases OWNER TO "Julie";

--
-- Name: purchase_id_seq; Type: SEQUENCE; Schema: public; Owner: Julie
--

CREATE SEQUENCE purchase_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE purchase_id_seq OWNER TO "Julie";

--
-- Name: purchase_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Julie
--

ALTER SEQUENCE purchase_id_seq OWNED BY purchases.id;


--
-- Name: shopping_cart; Type: TABLE; Schema: public; Owner: Julie
--

CREATE TABLE shopping_cart (
    id integer NOT NULL,
    user_id integer,
    product_id integer
);


ALTER TABLE shopping_cart OWNER TO "Julie";

--
-- Name: shopping_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: Julie
--

CREATE SEQUENCE shopping_cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE shopping_cart_id_seq OWNER TO "Julie";

--
-- Name: shopping_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Julie
--

ALTER SEQUENCE shopping_cart_id_seq OWNED BY shopping_cart.id;


--
-- Name: token_id_seq; Type: SEQUENCE; Schema: public; Owner: Julie
--

CREATE SEQUENCE token_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE token_id_seq OWNER TO "Julie";

--
-- Name: tokens; Type: TABLE; Schema: public; Owner: Julie
--

CREATE TABLE tokens (
    id integer NOT NULL,
    user_id integer,
    token text
);


ALTER TABLE tokens OWNER TO "Julie";

--
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: Julie
--

CREATE SEQUENCE tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tokens_id_seq OWNER TO "Julie";

--
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Julie
--

ALTER SEQUENCE tokens_id_seq OWNED BY tokens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: Julie
--

CREATE TABLE users (
    id integer NOT NULL,
    first_name character varying,
    last_name character varying,
    address_1 character varying,
    address_2 character varying,
    city character varying,
    state character varying,
    zip character varying,
    email character varying,
    password character varying
);


ALTER TABLE users OWNER TO "Julie";

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: Julie
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_id_seq OWNER TO "Julie";

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Julie
--

ALTER SEQUENCE user_id_seq OWNED BY users.id;


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY products ALTER COLUMN id SET DEFAULT nextval('products_id_seq'::regclass);


--
-- Name: products_purchases id; Type: DEFAULT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY products_purchases ALTER COLUMN id SET DEFAULT nextval('products_purchases_id_seq'::regclass);


--
-- Name: purchases id; Type: DEFAULT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY purchases ALTER COLUMN id SET DEFAULT nextval('purchase_id_seq'::regclass);


--
-- Name: shopping_cart id; Type: DEFAULT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY shopping_cart ALTER COLUMN id SET DEFAULT nextval('shopping_cart_id_seq'::regclass);


--
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY tokens ALTER COLUMN id SET DEFAULT nextval('tokens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Julie
--

SELECT pg_catalog.setval('product_id_seq', 1, false);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: Julie
--

COPY products (id, name, price, description, envelope_dimension, card_dimension, stock_count, image_url) FROM stdin;
4	Avocado	5	Teeny avocado envelope with matching blank flat card.	6.25" x 4.25"	 6" x 4"	20	/product_images/avocado.jpg
5	Strawberry	5	Strawberry card with bitten berry blank flat card.	6.25" x 4.25"	 6" x 4"	20	/product_images/strawberry.jpg
3	Birth Control Methods	5	Birth Control envelope and IUD blank flat card.	6.25" x 4.25"	 6" x 4"	10	/product_images/birth_control.jpg
2	Frosted Blueberry	5	Toaster pastry envelope with blank flat card. Address side of envelope is also a toaster pastry with room to write address.	6.25" x 4.25"	 6" x 4"	15	/product_images/pop_tart.jpg
1	NYC	5	New York City envelope with pepperoni pizza blank flat card.	6.25" x 4.25"	 6" x 4"	25	/product_images/NYC.jpg
6	Sriracha	3	Sriracha envelope.	6.25" x 4.25"	n/a	5	/product_images/sriracha.png
\.


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Julie
--

SELECT pg_catalog.setval('products_id_seq', 6, true);


--
-- Data for Name: products_purchases; Type: TABLE DATA; Schema: public; Owner: Julie
--

COPY products_purchases (id, purchase_id, product_id) FROM stdin;
34	25	3
35	25	6
36	26	3
37	26	2
38	27	6
39	27	3
40	28	3
41	29	3
42	29	6
43	30	2
44	30	3
45	31	2
46	32	3
47	33	2
48	33	3
\.


--
-- Name: products_purchases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Julie
--

SELECT pg_catalog.setval('products_purchases_id_seq', 48, true);


--
-- Name: purchase_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Julie
--

SELECT pg_catalog.setval('purchase_id_seq', 33, true);


--
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: Julie
--

COPY purchases (id, user_id) FROM stdin;
25	22
26	22
27	22
28	22
29	13
30	22
31	22
32	22
33	22
\.


--
-- Data for Name: shopping_cart; Type: TABLE DATA; Schema: public; Owner: Julie
--

COPY shopping_cart (id, user_id, product_id) FROM stdin;
106	13	3
115	22	3
\.


--
-- Name: shopping_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Julie
--

SELECT pg_catalog.setval('shopping_cart_id_seq', 115, true);


--
-- Name: token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Julie
--

SELECT pg_catalog.setval('token_id_seq', 1, false);


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: Julie
--

COPY tokens (id, user_id, token) FROM stdin;
66	22	a0097fe6-75fa-4b57-869a-5422645fde2a
67	13	5831e62d-0b35-426e-98b1-1af5882172d9
68	13	c098a810-4dc8-46a1-8120-184fb6fc7560
69	22	7ef5802b-5aa1-48d3-b9e8-19077ac97140
70	22	d422227e-a854-4b68-8be7-12744e162ffb
71	22	9db226c9-0ae4-4eaf-8a6e-70553adfb33b
72	22	db7348e6-264a-4cbf-a7f2-922c39723bea
73	22	8c9a677a-16d3-46ba-862d-f2e4deebb677
74	13	54c4605e-f1d7-4988-afb5-6525e34f4bfb
75	22	03f9fee4-a559-4ebd-b115-69adcdc9114e
76	22	bd8af6c2-6a3b-4c4e-9015-f1b4d4532cd8
77	22	e79bcf60-557f-4663-94ad-85da8c346079
78	22	03e68246-392b-4114-9193-946898223549
79	22	19f38fda-644a-4aef-86ad-b406b04bd2d9
80	22	ccf4b048-54d9-4c02-90e4-295d4fd10261
81	22	793ea284-4c10-4626-b499-215b56556462
82	22	614778e6-c67e-4fb0-b776-e48283bcae92
83	22	567b7b28-f494-430e-b5d0-3d5120c2b1ac
84	22	b9845fe6-e719-49a5-b9a9-52fcb8c4777b
\.


--
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Julie
--

SELECT pg_catalog.setval('tokens_id_seq', 84, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Julie
--

SELECT pg_catalog.setval('user_id_seq', 25, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: Julie
--

COPY users (id, first_name, last_name, address_1, address_2, city, state, zip, email, password) FROM stdin;
3	Lucy	Halcomb	123 Main Street	Apartment 2	New York	New York	20201	lucy@gmail.com	$2a$10$2XVWgEK.VatlQvCGasqwV.fhfBNLRGySnm26BZA.5UWItvEbSAzPK
13	Julie	Dyer	77 12th Street NE	Apartment 2209	Atlanta	Georgia	30309	juliemdyer@gmail.com	$2a$10$oTUOVVIlempkT8LKoxkDmu6yNraXF/EErot4MMr2.UX9KdbzG73Be
22	Tom	Jones	123 Main Street		Atlanta	Georgia	30309	tom@gmail.com	$2a$10$.dul3J/Hyikj28JwGYUJ7ubxxbhHVUbpPJRGLHu0LSTwR4GtZXo5C
\.


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products_purchases products_purchases_pkey; Type: CONSTRAINT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY products_purchases
    ADD CONSTRAINT products_purchases_pkey PRIMARY KEY (id);


--
-- Name: purchases purchase_pkey; Type: CONSTRAINT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY purchases
    ADD CONSTRAINT purchase_pkey PRIMARY KEY (id);


--
-- Name: shopping_cart shopping_cart_pkey; Type: CONSTRAINT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY shopping_cart
    ADD CONSTRAINT shopping_cart_pkey PRIMARY KEY (id);


--
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: products_purchases products_purchases_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY products_purchases
    ADD CONSTRAINT products_purchases_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);


--
-- Name: products_purchases products_purchases_purchase_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY products_purchases
    ADD CONSTRAINT products_purchases_purchase_id_fkey FOREIGN KEY (purchase_id) REFERENCES purchases(id);


--
-- Name: purchases purchases_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY purchases
    ADD CONSTRAINT purchases_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: shopping_cart shopping_cart_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY shopping_cart
    ADD CONSTRAINT shopping_cart_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);


--
-- Name: shopping_cart shopping_cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY shopping_cart
    ADD CONSTRAINT shopping_cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: tokens tokens_user_token_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Julie
--

ALTER TABLE ONLY tokens
    ADD CONSTRAINT tokens_user_token_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- PostgreSQL database dump complete
--

