create table categoria(
	id_categoria int(11) not null auto_increment,
	nm_categoria varchar(30),
	primary key (id_categoria)
);

insert into categoria (nm_categoria)
values ('Alimento'),
('Eletrodoméstico'),
('Eletroeletrônico');

create table forma_pagamento (
	id_forma_pagamento int(11) not null auto_increment,
    nm_forma_pagamento varchar(30),
    primary key (id_forma_pagamento)
);

insert into forma_pagamento (nm_forma_pagamento)
values ('dinheiro'),
('cartão de crédito'),
('transferência bancária'),
('depósito'),
('cartão de débito');

create table nota(
	cod_nota int(11) not null auto_increment,
	numero_nota varchar(10),
	data_nota date,
	fechado char(1),
	primary key (cod_nota)
);

insert into nota (numero_nota, data_nota, fechado)
values ('654123', '2017-05-09', 'S'),
('154155', '2018-09-22', 'N'),
('976543','2018-08-23', 'N');

create table estoque(
	id_estoque int(11) not null auto_increment, 
	quantidade int(4),
	primary key (id_estoque)
);

insert into estoque (quantidade)
values(450),
(665),
(348);

create table material(
	id_material int(11) not null auto_increment,
	codigo varchar(6),
	nome_material varchar(50) not null,
	unidade_referencia char(2) not null,
	categoria int(11),
    peso double(3,2),
    estoque int(11),
	primary key (id_material),
constraint fk_material_categoria
	foreign key (categoria)
		references categoria (id_categoria),
constraint fk_material_estoque
	foreign key (estoque)
		references estoque (id_estoque)
);

insert into material (codigo, nome_material, unidade_referencia, categoria, peso)
values ('124565', 'Geladeira', 'Gr', 1, 5.6),
('124565', 'Geladeira', 'Gr', 1, 5.6),
('124565', 'Geladeira', 'Gr', 1, 5.6),
('124565', 'Geladeira', 'Gr', 1, 5.6),
('124565', 'Geladeira', 'Gr', 1, 5.6),
('124565', 'Geladeira', 'Gr', 1, 5.6),
('124565', 'Geladeira', 'Gr', 1, 5.6),
('124565', 'Geladeira', 'Gr', 1, 5.6),
('124565', 'Geladeira', 'Gr', 1, 5.6);

create table item(
	id_item int(11) not null auto_increment,
	valor_item decimal(8,2),
	quantidade int(4),
	cd_nota int(11),
	material int(11),
	primary key (id_item),
constraint fk_item_nota
	foreign key (cd_nota)		
		references nota (cod_nota),
constraint fk_item_material
	foreign key (material)
		references material (id_material)
);

insert into item (valor_item, quantidade, cd_nota, material)
values (789.90, 1, 1, 10),
(9.99, 2, 1, 10);

create table tipo_usuario (
	id_tipo_usuario int(11) not null auto_increment, 
	tipo int(2),
	primary key (id_tipo_usuario)
);

insert into tipo_usuario ( tipo)
values(1),
(2),
(1);

create table usuario (
	id_usuario int (11) not null auto_increment,
	login varchar(20),
	senha varchar(10),
	ativo char (1),
    cd_tipo_usuario int(11),
	primary key (id_usuario),
    Constraint fk_usuario_tipo_usuario
		foreign key (cd_tipo_usuario) 
			references  tipo_usuario (id_tipo_usuario)
);

insert into usuario (login, senha, ativo, cd_tipo_usuario)
values ('Adm258', 'admin859', 'S', 1),
('admin', 'admin', 'S', 2),
('Estoque431', 'est1752', 'S', 1);

create table cliente (
	id_cliente int(11) not null auto_increment,
    nome_cliente varchar(80),
    sexo_cliente char(1),
    data_nascimento_cliente date,
    cep_cliente char(8),
    endereco_cliente varchar(50),
    numero_endereco_cliente int(5),
    municipio_cliente varchar(80),
    bairro_cliente varchar(50),
    celular_cliente varchar(20),
    primary key (id_cliente)
);

insert into cliente (nome_cliente, sexo_cliente, data_nascimento_cliente, 
cep_cliente, endereco_cliente, numero_endereco_cliente, municipio_cliente, bairro_cliente, celular_cliente)
values ('Cassandra Souza', 'F', '1989-02-20', '11712150', 'Avenida das gaivotinhas', 329, 'Praia Grande', 'Boqueirão', '13912341234'),
('Quezia Belarmino', 'F', '1992-09-04', '11712020', 'Avenida dos Pipoqueiros', 667, 'Praia Grande', 'Boqueirão', '13943214321');

create table pedido (
	cod_pedido int(11) not null auto_increment,
	quantidade_pedida int(4),
	cliente int(11) not null,
	cd_material int(11) not null,
	data_pedido date,
	obs varchar(180) not null,
    cd_pagamento int(11) not null,
	primary key (cod_pedido),
	constraint fk_pedido_cliente
		foreign key (cliente)
			references cliente (id_cliente),
	constraint fk_pedido_material
		foreign key (cd_material)
			references material (id_material),
	constraint fk_pedido_pagamento
		foreign key (cd_pagamento)
			references forma_pagamento (id_forma_pagamento)
);


insert into pedido (quantidade_pedida, cliente, cd_material, data_pedido, obs, cd_pagamento)
values (2, 1, 11, '2018-08-09', 'Precisando repor na sala', 1),
(1, 1, 10, '2018-04-06', 'Precisando substituir a existente', 2);

create table item_pedido(
	id_item_pedido int(11) not null auto_increment,
	quantidade int(11),
	cd_pedido int(11),
	cod_material int(11),
	obs varchar(180),
	primary key (id_item_pedido),
	constraint fk_item_pedido
		foreign key (cd_pedido)
			references pedido (cod_pedido),
	constraint fk_cod_material
		foreign key (cod_material)
			references material (id_material)
);

drop table item_pedido;

insert into item_pedido(quantidade, cd_pedido, cod_material, obs)
values (1, 1, 11 , 'Precisando repor na sala'),
(2, 2, 12, 'Precisando substituir a existente');