import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import axios from "axios";
import PDFDocument from "pdfkit-table";
import path from 'path';
import excel from "exceljs";

/*
Traemos los usuarios para que sean renderizados en la vista del administrador
*/
export const getUsuarios = async (req, res) => {
  try {
    let ruta = process.env.URL_BACKEND + '/api/users';
    let option = {
      method: "GET"
    };
    let usuarios = {};
    const resultado = await fetch(ruta, option)
      .then(response => response.json())
      .then(data => {
        usuarios = data[0];
      })
      .catch(err => console.error("Error en peticion: " + err));

    //Renderizamos los usuarios traidos en la vista del administrador
    res.render("admin", {
      "users": usuarios
    });
  } catch (error) {
    console.log(error);
  }
};


/*
Aqui el controlador de lo que es el login para usuarios puedan inicar sesion
*/
export const loginUsuario = async (req, res) => {
  try {
    let dataLogin = {
      CORREO: req.body.CORREO,
      CONTRASENA: req.body.CONTRASENA
    }
    let ruta = process.env.URL_BACKEND  + '/api/consult';
    let option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataLogin)
    };
    let datosDb = {};
    const resultado = await fetch(ruta, option)
      .then(response => response.json())
      .then(dataLogin => {
        datosDb = dataLogin[0];
      })
      .catch(err => console.error("Error en peticion: " + err));
      if (datosDb && dataLogin) {
      if (dataLogin.CORREO === datosDb.CORREO && dataLogin.CONTRASENA === datosDb.CONTRASENA) {
        const token = jwt.sign(datosDb, process.env.SECRET_KEY, {
          expiresIn: process.env.EXPIRE_TOKEN
        });
        res.cookie("SWF", token)
        if (datosDb.ESTADO == 1) {
          if (datosDb.COD_ROL === 1 || datosDb.COD_ROL ===2) {
            console.log("hola");
            res.render("inicio", {
              "user": datosDb,
              "rol": datosDb.COD_ROL,
              "cod_User":datosDb.COD_USUARIO
            });
            console.log(datosDb.COD_USUARIO);
            
          }
          if (datosDb.COD_ROL == 3) {
            try {
              let ruta =  `${process.env.URL_BACKEND}/api/users`;
              let option = {
                method: "GET"
              };
              let usuarios = {};
              const resultado = await fetch(ruta, option)
                .then(response => response.json())
                .then(data => {
                  usuarios = data[0];
                })
                .catch(err => console.error("Error en peticion: " + err));
                console.log(usuarios);
                
              res.render("admin", {
                "users": usuarios,
                "rol":datosDb.COD_ROL
              });
            } catch (error) {
              console.log(error);
            }
            res.redirect("/admin")
          }
        }else{
          console.log("Usuario Inhabilitado");
        }
      }
      console.log(dataLogin);
    } else {
      //console.log(dataLogin,comparacionEncriptacion);
      res.redirect("/registroUsuario")
    }
  } catch (error) {
    console.log(error);
  }
};

/*
Aqui el controlador para que el administrador pueda inhabilitar usuarios
*/
export const inhabilitar = async (req, res) => {
  let estado = req.query.estado
  if (estado == 1) {
    estado = 0
  } else {
    estado = 1
  }
  try {
    let data = {
      ESTADO: estado
    }
    console.log(data);
    let ruta =  `${process.env.URL_BACKEND}/api/users/${req.query.id}`;
    let option = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    console.log(data);
    let estad = {};
    const resultado = await fetch(ruta, option)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.error("Error en peticion: " + err));
    res.redirect("/admin")
  } catch (error) {
    console.log(error);
  }
};


/*
Aqui el controlador de la alerta del login
*/
export const alerta = (req,res)=>{
  let Alerta = req.query.error
  console.log(req.query.error)
  res.render("login",{Alert:Alerta})
}


/*
Aqui el controlador para cerrar sesion eliminando la cookie
activa dentro del aplicativo
*/
export const cerrarSesion = (req,res)=>{
  res.clearCookie("SWF");
  res.redirect("/");
}
//generacion documeto pdf con datos del usuario
export const generarPdf = async (req, res) => {
  try {
    // Hacer una solicitud GET a la API para obtener la información
    const response = await axios.get(process.env.URL_BACKEND + '/api/users');
    const usuarioslData = response.data[0]; // Obtener el primer elemento del arreglo

    // Crear un nuevo documento PDF
    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    // Stream el contenido PDF a la respuesta HTTP
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=usuarios.pdf');
    doc.pipe(res);


// Agregar el logo del proyecto
    const logoHeight = 50;
    const logoWidth = 50;
    const __dirname = path.resolve()
    const imagePath = path.resolve(path.join(__dirname,'public', 'img', 'Logo.png')) ;
    console.log(imagePath);
    const pageWidth = doc.page.width;

    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = 30;

    const pageHeight = doc.page.height;


    doc.image(imagePath, logoX, logoY, { width: logoWidth, height: logoHeight });

    // Agregar espacio después de la imagen
    doc.moveDown(2);


    // Agregar el encabezado
    doc.fontSize(24).text('Registro de usuarios', { align: 'center' });

    // Agregar espacio después del encabezado
    doc.moveDown();

    // Crear la tabla
    const table = {
      headers: ['ID', 'NOMBRE', 'APELLIDO', 'FECHA', 'CORREO', 'ROL', 'ESTADO', 'CELULAR'],
      rows: usuarioslData.map(usuarios => [
        usuarios.COD_USUARIO,
        usuarios.NOMBRES,
        usuarios.APELLIDOS,
        usuarios.FECHA_NACIMIENTO,
        usuarios.CORREO,
        usuarios.COD_ROL,
        usuarios.ESTADO,
        usuarios.CELULAR
      ])
    };

    // Agregar la tabla al documento con un tamaño de letra más pequeño
    await doc.table(table, { width: 500, prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10), prepareRow: () => doc.font('Helvetica').fontSize(10) });

    // Agregar el pie de página
    const generador = 'StreetWise Fitness';
    const fechaImpresion = new Date().toLocaleString();
    doc.fontSize(10).text(`Generado por: ${generador}`);
    doc.fontSize(10).text(`Fecha y hora de impresión: ${fechaImpresion}`, { align: 'right' });

    // Finalizar el PDF
    doc.end();
  } catch (error) {
    // Manejar errores de solicitud o cualquier otro error
    console.error(error);
    res.status(500).send('Error al generar el PDF');
  }
};
//generacion documento excel con datos del usuario
export const generarExcel = async (req, res) => {
  try {
    // Hacer una solicitud GET a la API para obtener la información
    const response = await axios.get(process.env.URL_BACKEND + '/api/users');
    const usuarioData = response.data[0]; // Obtener el primer elemento del arreglo

    // Crear un nuevo libro de Excel
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Usuarios');

     // Mostrar información por consola
    //  console.log('Información del Usuario:');
    //  usuarioData.forEach((usuarios) => {
    //    console.log(`ID: ${usuarios.COD_USUARIO}`);
    //    console.log(`Nombre del usuario: ${usuarios.NOMBRES}`);
    //    console.log(`Apellido del usuario: ${usuarios.APELLIDOS}`);
    //    console.log(`Fecha nacimiento del usuario: ${usuarios.FECHA_NACIMIENTO}`);
    //    console.log(`Correo del usuario: ${usuarios.CORREO}`);
    //    console.log(`Rol del usuario: ${usuarios.COD_ROL}`);
    //    console.log(`estado del usuario: ${usuarios.ESTADO}`);
    //    console.log(`celular del usuario: ${usuarios.CELULAR}`);
    //  });

    // Agregar encabezados de columna
    worksheet.columns = [
      { header: 'ID', key: 'COD_USUARIO', width: 10 },
      { header: 'Nombre', key: 'NOMBRES', width: 20 },
      { header: 'Apellido', key: 'APELLIDOS', width: 15 },
      { header: 'Fecha de nacimiento', key: 'FECHA_NACIMIENTO', width: 15 },
      { header: 'Correo', key: 'CORREO', width: 25 },
      { header: 'Codigo rol', key: 'COD_ROL', width: 15 },
      { header: 'Estado', key: 'ESTADO', width: 15 },
      { header: 'celular', key: 'CELULAR', width: 15 },
    ];

    // Agregar filas con datos
    usuarioData.forEach((usuarios) => {
      worksheet.addRow({
        COD_USUARIO: usuarios.COD_USUARIO,
        NOMBRES: usuarios.NOMBRES,
        APELLIDOS: usuarios.APELLIDOS,
        FECHA_NACIMIENTO: usuarios.FECHA_NACIMIENTO,
        CORREO: usuarios.CORREO,
        COD_ROL: usuarios.COD_ROL,
        ESTADO: usuarios.ESTADO,
        CELULAR: usuarios.CELULAR,
      });
    });

    // Stream el contenido Excel a la respuesta HTTP
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=usuarios.xlsx');
    await workbook.xlsx.write(res);

    // Finalizar la escritura del libro de Excel
    res.end();
  } catch (error) {
    // Manejar errores de solicitud o cualquier otro error
    console.error(error);
    res.status(500).send('Error al generar el archivo Excel');
  }
};