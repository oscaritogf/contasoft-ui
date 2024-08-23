// src/services/inventario.js
import settings from "./settings";

export async function GetInventarioElementos() {
  const response = await fetch(`${ settings.domain }/inventario/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-control": "no-cache",
      Authorization: `Bearer ${"token"}`,
    },
  });

  if (!response.ok) {
    throw new Error("Ha ocurrido un error al obtener los datos");
  }
  const data = await response.json();
  return data;
}

export async function GetPrestamoElementos() {
  const response = await fetch(`${ settings.domain }/prestamos/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-control": "no-cache",
      Authorization: `Bearer ${"token"}`,
    },
  });

  if (!response.ok) {
    throw new Error("Ha ocurrido un error al obtener los datos");
  }
  const data = await response.json();
  return data;
}

export async function GetConEntrega() {
  const response = await fetch(`${ settings.domain }/entrega/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-control": "no-cache",
      Authorization: `Bearer ${"token"}`,
    },
  });
  if (!response.ok) {
    throw new Error("Ha ocurrido un error al obtener los datos");
  }
  const data = await response.json();
  return data;
}

export async function GetUsuariosEntrega() {
  const response = await fetch(`${ settings.domain }/entrega/tarde`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-control": "no-cache",
      Authorization: `Bearer ${"token"}`,
    },
  });
  if (!response.ok) {
    throw new Error("Ha ocurrido un error al obtener los datos");
  }
  const data = await response.json();
  return data;
}

export async function GetInventario() {
  //const response = await fetch(`http://127.0.0.1:8000/inventario?cache-bust=${new Date().getTime()}`,{
  const response = await fetch(`${ settings.domain }/inventario`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-control": "no-cache",
      Authorization: `Bearer ${"token"}`,
    },
  });
  if (!response.ok) {
    throw new Error("Ha ocurrido un error al obtener los datos");
  }
  const data = await response.json();
  return data;
}

export async function GetCategorias() {
  try {
    const response = await fetch(`${ settings.domain }/categorias`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-control": "no-cache",
        Authorization: `Bearer ${"token"}`,
      },
    });
    if (!response.ok) {
      throw new Error("Ha ocurrido un error al obtener las categorías");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en GetCategorias:", error);
    throw error;
  }
}

export async function GetProveedores() {
  try {
    const response = await fetch(`${ settings.domain }/proveedores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-control": "no-cache",
        Authorization: `Bearer ${"token"}`,
      },
    });
    if (!response.ok) {
      throw new Error("Ha ocurrido un error al obtener los proveedores");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en GetProveedores:", error);
    throw error;
  }
}

export async function GetInventarioIten(id) {
  try {
    const response = await fetch(`${ settings.domain }/inventario/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-control": "no-cache",
        Authorization: `Bearer ${"token"}`,
      },
    });
    if (!response.ok) {
      if (response.status === 400) {
        return null;
      }
      throw new Error("network response was error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching inventory item : ', error);
    throw new Error;
  }
}

export async function UpdateInventarioIten(
  id_inventario,
  id_categoria,
  id_proveedor,
  nombre,
  cantidad,
  precio,
  observacion
) {
  const response = await fetch(
    `${ settings.domain }/inventario/${id_inventario}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Cache-control": "no-cache",
        Authorization: `Bearer ${"token"}`,
      },
      body: JSON.stringify({
        id_categoria,
        id_proveedor,
        nombre,
        cantidad,
        precio,
        observacion,
      }),
    }
  );
  if (!response.ok) throw new HTTPError(response);
  else return response.json();
}

export async function CreateInventarioIten(
  id_categoria,
  id_proveedor,
  nombre,
  cantidad,
  precio,
  observacion
) {
  const response = await fetch(`${ settings.domain }/inventario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-control": "no-cache",
      Authorization: `Bearer ${"token"}`,
    },
    body: JSON.stringify({
      id_categoria,
      id_proveedor,
      nombre,
      cantidad,
      precio,
      observacion,
    }),
  });
  if (!response.ok) throw new HTTPError(response);
  else return response.json();
}

export async function ArchivarInventarioItem(id) {
  const response = await fetch(
    `${ settings.domain }/inventario/archivar/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${"token"}`,
      },
    }
  );

  if (!response.ok) {
    return response;
  } else {
    return response.json();
  }
}
