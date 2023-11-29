const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;


app.use(bodyParser.json());

// Configuración de la conexión a SQL Server
const config = {
  user: 'VJ19_SQLLogin_1',
  password: 'usnmi4n8sx',
  server: 'BD_TIENDA_ONLINE.mssql.somee.com', // Puede ser una dirección IP o nombre del servidor
  database: 'BD_TIENDA_ONLINE',
  options: {
    encrypt: true, // Para conexiones seguras
    trustServerCertificate: true, // Aceptar certificados de servidor no confiables (no recomendado en producción)
  },
};

// Conectar a la base de datos
sql.connect(config).then(() => {
  console.log('Conectado a SQL Server');
}).catch((err) => {
  console.error('Error de conexión a SQL Server:', err);
});

// Define el esquema del producto (si aún no lo has hecho)
const Products = {
  ID_PRODUCTO: sql.Int, 
  NOMBRE: sql.VarChar,
  DESCRIPCION: sql.VarChar,
  PRECIO: sql.Decimal,
  STOCK: sql.Int,
};


// Obtener todos los productos
app.get('/products', async (req, res) => {
    try {
      const result = await sql.query('SELECT * FROM PRODUCTOS');
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos de la base de datos' });
    }
  });
  //obtener todos los clientes 
  app.get('/clients', async (req, res) => {
    try {
      const result = await sql.query('SELECT * FROM CLIENTE');
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los clientes de la base de datos' });
    }
  });

  //obtener todos los detalle pedido 
  app.get('/detallepedido', async (req, res) => {
    try {
      const result = await sql.query('SELECT * FROM DETALLE_DE_PEDIDO');
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los detalles de la base de datos' });
    }
  });

  //obtener todos los pedidos
  app.get('/pedido', async (req, res) => {
    try {
      const result = await sql.query('SELECT * FROM PEDIDO');
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los pedidos de la base de datos' });
    }
  });

  // Obtener un producto por ID
  app.get('/products/:id', async (req, res) => {
    const Products = req.params.id;
  
    try {
      const result = await sql.query('SELECT * FROM PRODUCTOS WHERE ID_PRODUCTO = @ID_PRODUCTO', {
        id: Products,
      });
     
      if (result.recordset.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        res.json(result.recordset[0]);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto de la base de datos' });
    }
  });

    // Obtener un cliente por ID
    app.get('/clients/:id', async (req, res) => {
        const clients = req.params.id;
      
        try {
          const result = await sql.query('SELECT * FROM CLIENTE WHERE ID_CLIENTE = @ID_CLIENTE', {
            clients: ID_CLIENTE,
          });
         
          if (result.recordset.length === 0) {
            res.status(404).json({ error: 'cliente no encontrado' });
          } else {
            res.json(result.recordset[0]);
          }
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener el cliente de la base de datos' });
        }
      });

  // Eliminar un producto por ID
  app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
    
    try {
      const result = await sql.query('DELETE FROM PRODUCTOS WHERE ID_PRODUCTO = @ID_PRODUCTO', {
        id: productId,
      });
      
      if (result.rowsAffected[0] === 0) {
        res.status(404).json({ error: 'Producto no encontrado o ya ha sido eliminado' });
      } else {
        res.json({ message: 'Producto eliminado correctamente' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto de la base de datos' });
    }
  });

  // Eliminar un cliente por ID
  app.delete('/clients/:id', async (req, res) => {
    const client = req.params.id;
    
    try {
      const result = await sql.query('DELETE FROM CLIENTE WHERE ID_CLIENTE = @ID_CLIENTE', {
        id: client,
      });
      
      if (result.rowsAffected[0] === 0) {
        res.status(404).json({ error: 'cliente no encontrado o ya ha sido eliminado' });
      } else {
        res.json({ message: 'cliente eliminado correctamente' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el cliente de la base de datos' });
    }
  });
  
// Eliminar un pedido por ID
app.delete('/pedido/:id', async (req, res) => {
  const ID_PEDIDO = req.params.id;
  
  try {
    const result = await sql.query('DELETE FROM PEDIDO WHERE ID_PEDIDO = @ID_PEDIDO', {
      id: ID_PEDIDO,
    });
    
    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: 'pedido no encontrado o ya ha sido eliminado' });
    } else {
      res.json({ message: 'pedido eliminado correctamente' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pedido de la base de datos' });
  }
});

  // Insertar productos
  app.post('/products/insert', async (req, res) => {
    const { ID_PRODUCTO, NOMBRE, DESCRIPCION, PRECIO, STOCK} = req.body; // Suponiendo que se espera un JSON con nombre, descripción y precio
    
    try {
      const result = await sql.query(
        'INSERT INTO PRODUCTOS (ID_PRODUCTO, NOMBRE, DESCRIPCION, PRECIO, STOCK) VALUES (@ID_PRODUCTO, @NOMBRE, @DESCRIPCION, @PRECIO, @STOCK)',
        {
          ID_PRODUCTO, 
          NOMBRE, 
          DESCRIPCION, 
          PRECIO, 
          STOCK
        }
      );
      
      if (result.rowsAffected[0] === 1) {
        res.status(201).json({ message: 'Producto agregado correctamente' });
      } else {
        res.status(500).json({ error: 'Error al agregar el producto a la base de datos' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar el producto a la base de datos' });
    }
  });

  // Insertar cliente
  app.post('/clients/insert', async (req, res) => {
    const { ID_CLIENTE,NOMBRE,APELLIDO,CORREO,DIRECCION,TELEFONO } = req.body; // Suponiendo que se espera un JSON con nombre, descripción y precio
    
    try {
      const result = await sql.query(
        'INSERT INTO CLIENTE (ID_CLIENTE, NOMBRE, APELLIDO, CORREO, DIRECCION, TELEFONO) VALUES (@ID_CLIENTE, @NOMBRE, @APELLIDO, @CORREO, @DIRECCION, @TELEFONO)',
        {
          ID_CLIENTE,
          NOMBRE,
          APELLIDO,
          CORREO,
          DIRECCION,
          TELEFONO,
        }
      );
      
      if (result.rowsAffected[0] === 1) {
        res.status(201).json({ message: 'cliente agregado correctamente' });
      } else {
        res.status(500).json({ error: 'Error al agregar el cliente a la base de datos' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar el cliente a la base de datos' });
    }
  });

  // Insertar PEDIDO
  app.post('/pedido/insert', async (req, res) => {
    const { ID_PEDIDO, FECHA_PEDIDO, ESTADO } = req.body; // Suponiendo que se espera un JSON con nombre, descripción y precio
    
    try {
      const result = await sql.query(
        'INSERT INTO PEDIDO (ID_PEDIDO, FECHA_PEDIDO, ESTADO) VALUES (@ID_PEDIDO, @FECHA_PEDIDO, @ESTADO)',
        {
          ID_PEDIDO,
          FECHA_PEDIDO,
          ESTADO
        }
      );
      
      if (result.rowsAffected[0] === 1) {
        res.status(201).json({ message: 'pedido agregado correctamente' });
      } else {
        res.status(500).json({ error: 'Error al agregar el pedido a la base de datos' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar el pedido a la base de datos' });
    }
  });
  
  // Actualizar producto
  app.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const { NOMBRE,DESCRIPCION,PRECIO } = req.body; // Suponiendo que se espera un JSON con nombre, descripción y precio a actualizar
  
    try {
      const result = await sql.query(
    'UPDATE PRODUCTOS SET NOMBRE = @NOMBRE, DESCRIPCION = @DESCRIPCION, PRECIO = @PRECIO, STOCK = @STOCK WHERE ID_PRODUCTO = @ID_PRODUCTO',
        {
          NOMBRE,
          DESCRIPCION ,
          PRECIO,
          id: productId,
        }
      );
  
      if (result.rowsAffected[0] === 1) {
        res.json({ message: 'Producto actualizado correctamente' });
      } else {
        res.status(404).json({ error: 'Producto no encontrado o no se realizó ninguna actualización' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto en la base de datos' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });

// Actualizar cliente
app.put('/clients/:id', async (req, res) => {
  const clientsId = req.params.id;
  const { NOMBRE, APELLIDO, CORREO, DIRECCION,TELEFONO } = req.body; // Suponiendo que se espera un JSON con nombre, descripción y precio a actualizar

  try {
    const result = await sql.query(
  ' UPDATE CLIENTE SET NOMBRE = @NOMBRE, APELLIDO = @APELLIDO, CORREO = @CORREO, DIRECCION=@DIRECCION, TELEFONO = @TELEFONO WHERE ID_CLIENTE = @ID_CLIENTE;',
      {
        NOMBRE,
        APELLIDO,
        CORREO,
        DIRECCION,
        TELEFONO,
        id: clientsId,
      }
    );

    if (result.rowsAffected[0] === 1) {
      res.json({ message: 'cliente actualizado correctamente' });
    } else {
      res.status(404).json({ error: 'cliente no encontrado o no se realizó ninguna actualización' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el cliente en la base de datos' });
  }
});

// Actualizar pedido
app.put('/pedido/:id', async (req, res) => {
  const pedidoId = req.params.id;
  const { ESTADO} = req.body; // Suponiendo que se espera un JSON con nombre, descripción y precio a actualizar

  try {
    const result = await sql.query(
  '  UPDATE PEDIDO SET ESTADO = @NUEVOESTADO WHERE ID_PEDIDO = @ID_PEDIDO',
      {
        ESTADO,
        id: pedidoId,
      }
    );

    if (result.rowsAffected[0] === 1) {
      res.json({ message: 'pedido actualizado correctamente' });
    } else {
      res.status(404).json({ error: 'pedido no encontrado o no se realizó ninguna actualización' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el pedido en la base de datos' });
  }
});

  // Resto del código...