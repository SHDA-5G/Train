
-- Створення БД

CREATE DATABASE Trains
GO

USE Trains 
GO

-- Cтворення таблиці комопнентів

CREATE TABLE [dbo].[Articles]
(
   Id int identity(1,1),
   [Name] varchar (max),
   UniqueNumber varchar(10),
   canAssignQuantity bit
)

CREATE CLUSTERED INDEX [ClusteredIndex-20250416-120021] ON [dbo].[Articles]
(
	Id	
)
CREATE NONCLUSTERED INDEX [ClusteredIndex-20250416-120025] ON [dbo].[Articles]
(
	canAssignQuantity	
)

-- Cтворення таблиці ієрархії компонентів

CREATE TABLE [dbo].[Quantities]
(
   id int,       -- дочірній компонент
   parentId int, -- батьківський  компонент 
   kolvo int  -- кількість
)

CREATE CLUSTERED INDEX [ClusteredIndex-20250416-120021] ON [dbo].[Quantities]
(
	Id,
	ParentId
)
