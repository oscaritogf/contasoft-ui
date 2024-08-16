// src/services/inventario.js

export async function GetInventarioElementos() {

    const response = await fetch(`http://127.0.0.1:8000/inventario/count?cache-bust=${new Date().getTime()}`,{
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
    const response = await fetch(`http://127.0.0.1:8000/prestamos/count?cache-bust=${new Date().getTime()}`,{
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
        const response = await fetch(`http://127.0.0.1:8000/categorias/nombre?cache-bust=${new Date().getTime()}`,{
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
        const response = await fetch(`http://127.0.0.1:8000/proveedores/nombre?cache-bust=${new Date().getTime()}`,{
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