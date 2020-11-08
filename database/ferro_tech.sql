create database ferrotech;
use ferrotech;

 create table usuario (
	id_usuario int(11) not null auto_increment,
    login varchar (20),
    senha varchar (10),
    ativo char(1),
    cd_tipo_usuario int (11),
    constraint pk_id_usuario primary  key (id_usuario),
    constraint fk_tipo_usuario foreign key (cd_tipo_usuario)
		references tipo_usuario (id_tipo)
 );
 
 create table tipo_usuario (
	id_tipo int(11) not null auto_increment,
	tipo int(2),
    constraint pk_tipo_usuario primary key (id_tipo)
 );
 
 create table material (
	id_material int(11) not null auto_increment,
    codigo_material varchar(6),
    nome_material varchar(50),
    unidade_referencia char(2),
    categoria int(11),
    peso decimal(3,2),
    estoque int(11),
    tipo varchar(20),
    constraint pk_id_material primary key (id_material)
 );
 
 create table item_material (
	id_item_material int(11) not null auto_increment,
    materiais int(11),
    cod_nota int(11),
    constraint pk_item_material primary key (id_item_material),
    constraint fk_materiais foreign key (materiais)
		references material (id_material),
	constraint fk_cod_nota_materiais foreign key (cod_nota)
		references nota (cod_nota)
 );
 
 create table nota (
	cod_nota int(11) not null auto_increment,
    numero_nota varchar(10),
    data_nota date,
    fechado char(1),
    id_item_material int(11),
    id_usuario int(11),
    constraint pk_cod_nota primary key (cod_nota),
    constraint fk_usuario foreign key (id_usuario)
		references usuario (id_usuario)
 );
 
 create table venda (
	id_venda int(11) not null auto_increment,
    tipo_material varchar(20),
    medida_referencia char(2),
    peso decimal(3,2),
    total decimal(3,2),
    cod_nota int(11),
    constraint pk_id_venda primary key (id_venda),
    constraint fk_cod_nota_venda foreign key (cod_nota)
		references nota (cod_nota)
 );
 
  create table compra_material (
	id_compra int(11) not null auto_increment,
    tipo_material varchar(20),
    medida_referencia char(2),
    peso decimal(3,2),
    total decimal(3,2),
    cod_nota int(11),
    constraint pk_id_compra primary key (id_compra),
    constraint fk_cod_nota_compra foreign key (cod_nota)
		references nota (cod_nota)
 );
 