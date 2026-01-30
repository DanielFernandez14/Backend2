const API_BASE = "http://localhost:1234/api/products";

const messages = document.querySelector(".messages");
const form = document.querySelector("#productForm");

const inputId = document.querySelector("#productId");
const inputName = document.querySelector("#name");
const inputPrice = document.querySelector("#price");
const inputCategory = document.querySelector("#category");

const btnSubmit = document.querySelector("#btnSubmit");
const btnCancel = document.querySelector("#btnCancel");
const btnRefresh = document.querySelector("#btnRefresh");

// Listas por “carpeta”
const listLimpieza = document.querySelector("#products-limpieza");
const listAlmacen = document.querySelector("#products-almacen");

// Contadores
const countTotal = document.querySelector("#count-total");
const countLimpieza = document.querySelector("#count-limpieza");
const countAlmacen = document.querySelector("#count-almacen");
const limpiezaTotal = document.querySelector("#limpieza-total");
const almacenTotal = document.querySelector("#almacen-total");

// ---------- helpers ----------
const setMessage = (text, type = "") => {
    messages.textContent = text || "";
    messages.classList.remove("ok", "err");
    if (type) {
        messages.classList.add(type);
    }
};

const sanitizeText = (value) => {
    return String(value ?? "").trim();
};


const btnDownload = document.querySelector("#btnDownload");

const downloadBackup = async () => {
    try {
        setMessage("Generando backup…", "");

        const result = await apiFetch(API_BASE, { method: "GET" });

        const backup = {
            exportedAt: new Date().toISOString(),
            total: result?.data?.length ?? 0,
            data: result?.data ?? []
        };

        const blob = new Blob([JSON.stringify(backup, null, 4)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `products-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(url);

        setMessage("✅ Backup descargado.", "ok");
    } catch (error) {
        console.error(error);
        setMessage(error.message, "err");
    }
};

btnDownload.addEventListener("click", downloadBackup);



const getFormData = () => {
    const name = sanitizeText(inputName.value);
    const priceRaw = sanitizeText(inputPrice.value);
    const category = sanitizeText(inputCategory.value);

    if (name.length < 2) {
        throw new Error("El nombre debe tener al menos 2 caracteres.");
    }

    if (!category) {
        throw new Error("Tenés que seleccionar una categoría.");
    }

    if (category !== "limpieza" && category !== "almacen") {
        throw new Error("Categoría inválida. Usá 'limpieza' o 'almacen'.");
    }

    const priceNum = Number(priceRaw);

    if (!Number.isFinite(priceNum) || priceNum < 0) {
        throw new Error("El precio debe ser un número válido (>= 0).");
    }

    // ✅ Backend pro usa price Number (igual soporta string si tu controller lo transforma)
    return { name, price: priceNum, category };
};

const resetForm = () => {
    inputId.value = "";
    form.reset();
    btnSubmit.textContent = "Agregar Producto";
    btnCancel.style.display = "none";
};

const apiFetch = async (url, options = {}) => {
    const response = await fetch(url, options);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const msg = data?.message || `Error HTTP ${response.status}`;
        const err = new Error(msg);
        err.status = response.status;
        err.data = data;
        throw err;
    }

    return data;
};

// ---------- render ----------
const clearLists = () => {
    listLimpieza.innerHTML = "";
    listAlmacen.innerHTML = "";
};

const setCounters = (products) => {
    const total = products.length;
    const limpieza = products.filter((p) => p.category === "limpieza").length;
    const almacen = products.filter((p) => p.category === "almacen").length;

    countTotal.textContent = String(total);
    countLimpieza.textContent = String(limpieza);
    countAlmacen.textContent = String(almacen);

    limpiezaTotal.textContent = String(limpieza);
    almacenTotal.textContent = String(almacen);
};

const createProductItem = (product) => {
    const li = document.createElement("li");
    li.className = "product-item";

    const info = document.createElement("div");
    info.className = "product-item__info";

    const nameEl = document.createElement("div");
    nameEl.className = "product-item__name";
    nameEl.textContent = `${product.name}`;

    const meta = document.createElement("div");
    meta.className = "product-item__meta";

    const priceEl = document.createElement("span");
    priceEl.className = "pill";
    priceEl.textContent = `$${product.price}`;

    const catEl = document.createElement("span");
    catEl.className = `pill ${product.category === "limpieza" ? "pill--limpieza" : "pill--almacen"}`;
    catEl.textContent = product.category;

    meta.appendChild(priceEl);
    meta.appendChild(catEl);

    info.appendChild(nameEl);
    info.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "product-item__actions";

    const btnEdit = document.createElement("button");
    btnEdit.type = "button";
    btnEdit.className = "btn";
    btnEdit.textContent = "Editar";
    btnEdit.addEventListener("click", () => {
        inputId.value = product._id || product.id || "";
        inputName.value = product.name ?? "";
        inputPrice.value = product.price ?? "";
        inputCategory.value = product.category ?? "";

        btnSubmit.textContent = "Guardar cambios";
        btnCancel.style.display = "inline-block";
        setMessage("Editando producto…", "");
    });

    const btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.className = "btn btn--danger";
    btnDelete.textContent = "Eliminar";
    btnDelete.addEventListener("click", async () => {
        const id = product._id || product.id;

        if (!id) {
            setMessage("No se encontró el id del producto para eliminar.", "err");
            return;
        }

        const ok = confirm(`¿Eliminar "${product.name}"?`);
        if (!ok) {
            return;
        }

        try {
            setMessage("Eliminando…", "");
            await apiFetch(`${API_BASE}/${id}`, { method: "DELETE" });
            setMessage("✅ Producto eliminado.", "ok");
            await fetchingProducts();
        } catch (error) {
            console.error(error);
            setMessage(error.message, "err");
        }
    });

    actions.appendChild(btnEdit);
    actions.appendChild(btnDelete);

    li.appendChild(info);
    li.appendChild(actions);

    return li;
};

const renderProductsByCategory = (products) => {
    clearLists();
    setCounters(products);

    const limpieza = products.filter((p) => p.category === "limpieza");
    const almacen = products.filter((p) => p.category === "almacen");

    if (limpieza.length === 0) {
        const empty = document.createElement("li");
        empty.className = "product-item";
        empty.textContent = "No hay productos de limpieza.";
        listLimpieza.appendChild(empty);
    } else {
        limpieza.forEach((p) => listLimpieza.appendChild(createProductItem(p)));
    }

    if (almacen.length === 0) {
        const empty = document.createElement("li");
        empty.className = "product-item";
        empty.textContent = "No hay productos de almacén.";
        listAlmacen.appendChild(empty);
    } else {
        almacen.forEach((p) => listAlmacen.appendChild(createProductItem(p)));
    }
};

// ---------- requests ----------
const fetchingProducts = async () => {
    try {
        setMessage("Cargando productos…", "");
        const result = await apiFetch(API_BASE, { method: "GET" });

        renderProductsByCategory(result.data);
        setMessage("", "");
    } catch (error) {
        console.error(error);
        setMessage(error.message, "err");
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        setMessage("", "");
        const payload = getFormData();
        const id = sanitizeText(inputId.value);

        // Crear
        if (!id) {
            const result = await apiFetch(API_BASE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            setMessage(result?.message || "✅ Producto creado.", "ok");
            resetForm();
            await fetchingProducts();
            return;
        }

        // Editar
        const result = await apiFetch(`${API_BASE}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        setMessage(result?.message || "✅ Producto actualizado.", "ok");
        resetForm();
        await fetchingProducts();
    } catch (error) {
        console.error(error);
        setMessage(error.message, "err");
    }
});

btnCancel.addEventListener("click", () => {
    resetForm();
    setMessage("Edición cancelada.", "");
});

btnRefresh.addEventListener("click", async () => {
    await fetchingProducts();
});



// start
fetchingProducts();
