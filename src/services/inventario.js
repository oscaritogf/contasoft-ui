// src/services/inventario.js
import settings from "./settings"

export async function GetInventarioElementos() {

    const response = await fetch(`${ settings.domain}/inventario/count?cache-bust=${new Date().getTime()}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            ,'Cache-control': 'no-cache'
        }
    });
    
    if (!response.ok) {
        throw new Error('Ha ocurrido un error al obtener los datos');
    }
    const data = await response.json();
    return data;
}

export async function GetPrestamoElementos() {
    const response = await fetch(`${ settings.domain}/prestamos/count?cache-bust=${new Date().getTime()}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            ,'Cache-control': 'no-cache'
        }
    });
    
    if (!response.ok) {
        throw new Error('Ha ocurrido un error al obtener los datos');
    }
    const data = await response.json();
    return data;
}

export async function GetConEntrega(){
    const response = await fetch(`http://127.0.0.1:8000/entrega/count?cache-bust=${new Date().getTime()}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            ,'Cache-control': 'no-cache'
        }
    });
    if (!response.ok) {
        throw new Error('Ha ocurrido un error al obtener los datos');
    }
    const data = await response.json();
    return data;
}

export async function GetUsuariosEntrega(){
    const response = await fetch(`http://127.0.0.1:8000/entrega/tarde?cache-bust=${new Date().getTime()}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            ,'Cache-control': 'no-cache'
        }
    });
    if (!response.ok) {
        throw new Error('Ha ocurrido un error al obtener los datos');
    }
    const data = await response.json();
    return data;
}

export async function GetInventario() {
    const response = await fetch(`http://127.0.0.1:8000/inventario?cache-bust=${new Date().getTime()}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            ,'Cache-control': 'no-cache'
        }
    });
    if(!response.ok) {
        throw new Error('Ha ocurrido un error al obtener los datos');
    }
    const data = await response.json();
    return data;
}

export async function GetCategorias() {
    try {
        const response = await fetch(`http://localhost:8000/categorias?cache-bust=${new Date().getTime()}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                ,'Cache-control': 'no-cache'
            }
        });
        if(!response.ok) {
            throw new Error('Ha ocurrido un error al obtener las categorías');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en GetCategorias:', error);
        throw error;
    }
}

export async function GetProveedores() {
    try {
        const response = await fetch(`http://localhost:8000/proveedores?cache-bust=${new Date().getTime()}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                ,'Cache-control': 'no-cache'
            }
        });
        if(!response.ok) {
            throw new Error('Ha ocurrido un error al obtener los proveedores');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en GetProveedores:', error);
        throw error;
    }
}

export async function GetInventarioIten(id){
    const response = await fetch(`http://localhost:8000/inventario/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            ,'Cache-control': 'no-cache'
        }
    });
    if(!response.ok) 
       return response;
    else
        return response.json(); 

    }

export async function UpdateInventarioIten(id_inventario, id_categoria, id_proveedor,nombre, cantidad, precio, observacion){
    const response = await fetch(`http://localhost:8000/inventario/${id_inventario}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            ,'Cache-control': 'no-cache'
        },
        body: JSON.stringify({
            id_categoria,
            id_proveedor,
            nombre,
            cantidad,
            precio,
            observacion
        })
    });
    if(!response.ok) 
        throw new HTTPError(response);
    else
        return response.json();
}


export async function CreateInventarioIten(id_categoria, id_proveedor,nombre, cantidad, precio, observacion){
    const response = await fetch(`http://localhost:8000/inventario`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            ,'Cache-control': 'no-cache'
        },
        body: JSON.stringify({
            id_categoria,
            id_proveedor,
            nombre,
            cantidad,
            precio,
            observacion
        })
    });
    if(!response.ok) 
        throw new HTTPError(response);
    else
        return response.json();
}


export async function ArchivarInventarioItem(id) {
    const response = await fetch(`http://localhost:8000/inventario/archivar/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
    });

    if (!response.ok) {
        
        return response;
    } else {
        return response.json();
    }
}


export async function PostPrestamoItem(id, id_usuario, cantidad, fecha_entrega) {
    const response = await fetch(`http://localhost:8000/inventario/prestamos/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({
            id_usuario,
            cantidad,
            fecha_entrega
           
        }),
    });

    if (!response.ok) {
        throw new HTTPError(response);
    } else {
        return response.json();
    }
}