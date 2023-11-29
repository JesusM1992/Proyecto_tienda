<?PHP 
$conectar =@mysql_connect("localhost","root","",);
if (!$conectar){
    echo "No Se Pudo Conectar";
}else {
    $base=mysql_select_db("webtiendas");
    if (!$base){
        echo "No Se Encontro Base De Datos";
    }
}

    $nombre = $_POST ["nombre"];
    $apellidos = $_POST ["apellidos"];
    $correo = $_POST ["correo"];
    $direccion= $_POST ["direccion"];
    $telefono = $_POST ["telefono"];

    $sql=" INSER INTO datos VALUE ($nombre, $apellidos, $correo, $direccion, $telefono)";

    $ejecutar=mysql_query($sql);
    if (!$ejecutar){
        echo "Hubo Un Error";
    }else { "Datos Guardados <br> <a  href = 'formulario.html'> Volver </a> ";

    }

?>