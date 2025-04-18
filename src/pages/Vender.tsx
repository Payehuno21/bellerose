// src/pages/Vender.tsx
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { imprimirDesdeBoton } from '../components/TicketVenta';

const mockProducts = [
  { id: 1, name: 'Taza personalizada', price: 120 },
  { id: 2, name: 'Playera estampada', price: 200 },
  { id: 3, name: 'Termo grabado', price: 150 },
];

export default function Vender() {
  const [cart, setCart] = useState([]);
  const [iva, setIva] = useState(false);
  const [clientName, setClientName] = useState('');
  const [reference, setReference] = useState('');
  const [metodoPago, setMetodoPago] = useState('Efectivo');
  const [ventaId, setVentaId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [emailTo, setEmailTo] = useState('');

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    const n = parseInt(qty, 10);
    if (n < 1) return;
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: n } : i));
  };

  const removeCart = () => setCart([]);

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = iva ? subtotal * 1.16 : subtotal;

  const handleFinishSale = async () => {
    if (!clientName.trim()) {
      alert('Por favor, ingresa el nombre del cliente.');
      return;
    }
    // ID secuencial 4 dígitos
    const ventasSnapshot = collection(db, 'ventas');
    const ventas = (await getDocs(ventasSnapshot)).docs;
    const next = ventas.length + 1;
    const id = next.toString().padStart(4, '0');

    const venta = {
      id,
      cliente: clientName,
      referencia: reference,
      productos: cart,
      metodoPago,
      iva: iva ? 0.16 : 0,
      total,
      fecha: Timestamp.now(),
    };
    await addDoc(collection(db, 'ventas'), venta);
    setVentaId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCart([]);
    setClientName('');
    setReference('');
    setIva(false);
    setEmailTo('');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 relative">
      {/* Lista de productos */}
      <div className="flex-1">
        <h2 className="text-2xl text-[#b68d40] font-bold mb-4">Selecciona productos 🛒</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded shadow border border-[#fbd5e5]">
              <h3 className="font-semibold text-[#b68d40]">{product.name}</h3>
              <p className="text-sm text-gray-600">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 px-3 py-1 bg-[#b68d40] text-white rounded hover:bg-[#a57d36]"
              >
                Agregar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Carrito */}
      <div className="lg:w-1/3 bg-white border border-[#fbd5e5] rounded p-4 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl text-[#b68d40] font-semibold">Carrito</h2>
          {cart.length > 0 && (
            <button
              onClick={removeCart}
              className="text-sm text-red-500 underline hover:text-red-600"
            >
              Borrar venta
            </button>
          )}
        </div>

        <input
          type="text"
          placeholder="Nombre del cliente *"
          value={clientName}
          onChange={e => setClientName(e.target.value)}
          className="w-full mb-2 px-3 py-1 border rounded text-sm"
          required
        />
        <input
          type="text"
          placeholder="Referencia (Facebook, Whatsapp o Empresa)"
          value={reference}
          onChange={e => setReference(e.target.value)}
          className="w-full mb-3 px-3 py-1 border rounded text-sm"
        />

        <select
          value={metodoPago}
          onChange={e => setMetodoPago(e.target.value)}
          className="w-full mb-3 px-3 py-1 border rounded text-sm text-gray-700"
        >
          <option value="Efectivo">💵 Efectivo</option>
          <option value="Transferencia">🏦 Transferencia</option>
          <option value="Depósito">🏧 Depósito</option>
          <option value="Tarjeta">💳 Tarjeta</option>
        </select>

        {cart.length === 0 ? (
          <p className="text-sm text-gray-500">No hay productos en el carrito.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between items-center">
                <span className="text-sm w-1/2">{item.name}</span>
                <input
                  type="number"
                  value={item.quantity}
                  min={1}
                  className="w-14 text-center border rounded"
                  onChange={e => updateQuantity(item.id, e.target.value)}
                />
                <span className="text-sm font-medium">${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex items-center justify-between">
          <label className="text-sm text-[#b68d40] flex items-center gap-2">
            <input type="checkbox" checked={iva} onChange={() => setIva(!iva)} />
            Incluir IVA (16%)
          </label>
        </div>

        <div className="mt-4 pt-4 border-t border-dashed text-right text-[#b68d40] font-bold">
          Total: ${total.toFixed(2)}
        </div>

        <button
          disabled={cart.length === 0}
          onClick={handleFinishSale}
          className="mt-4 w-full py-2 bg-[#fbd5e5] text-[#b68d40] font-semibold rounded hover:bg-[#f7bba6] disabled:opacity-50"
        >
          Finalizar venta
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold text-[#b68d40] mb-3">
              ¡Venta registrada!
            </h2>
            <p className="text-sm mb-4 text-gray-700">ID: {ventaId}</p>

            {/* Campo para email */}
            <input
              type="email"
              placeholder="Enviar nota a correo"
              value={emailTo}
              onChange={e => setEmailTo(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded text-sm"
            />

            <div className="flex flex-col gap-3">
              {/* Imprimir ticket */}
              <button
                className="w-full bg-[#b68d40] text-white py-2 rounded hover:bg-[#a57d36]"
                onClick={() =>
                  imprimirDesdeBoton({
                    id: ventaId,
                    cliente: clientName,
                    encabezado: `Belle Rose · Venta #${ventaId}`,
                    productos: cart,
                    fecha: new Date().toLocaleString(),
                    subtotal,
                    iva: iva ? 0.16 : 0,
                    total,
                    metodoPago
                  })
                }
              >
                🖨 Imprimir ticket
              </button>

              {/* Descargar nota PDF */}
              <button
                className="w-full bg-[#fdeaf2] text-[#b68d40] py-2 rounded hover:bg-[#fbd5e5]"
                onClick={() => {
                  import('html2pdf.js').then(module => {
                    const html2pdf = module.default;
                    const element = document.createElement('div');
                    element.innerHTML = `
                      <style>
                        @import url('https://fonts.googleapis.com/css2?family=Gabriela&display=swap');
                        #nota { font-family: 'Gabriela', serif; }
                        #nota h2 { color: #b68d40; }
                      </style>
                      <div id="nota" style="
                        width:216mm;
                        height:140mm;
                        padding:20px;
                        background:#fdeaf2;
                        box-sizing:border-box;
                      ">
                        <div style="text-align:center;border-bottom:1px dashed #b68d40;padding-bottom:10px;">
                          <img src="/logo.png" alt="logo" style="height:60px;margin-bottom:10px;" />
                          <h2>Belle Rose · Venta #${ventaId}</h2>
                        </div>
                        <div style="margin-top:16px;">
                          <p><strong>Cliente:</strong> ${clientName}</p>
                          <p><strong>Referencia:</strong> ${reference}</p>
                          <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-MX')} ${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</p>
                          <p><strong>Pago:</strong> ${metodoPago}</p>
                        </div>
                        <hr style="margin:16px 0;border-color:#b68d40;" />
                        <ul>
                          ${cart.map(item => `<li>${item.quantity}×${item.name} — $${item.price*item.quantity}</li>`).join('')}
                        </ul>
                        <hr style="margin:16px 0;border-color:#b68d40;" />
                        <div style="text-align:right;">
                          <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
                          ${iva ? `<p><strong>IVA (16%):</strong> $${(subtotal*0.16).toFixed(2)}</p>` : ''}
                          <p><strong>Total:</strong> $${total.toFixed(2)}</p>
                        </div>
                        <p style="text-align:center;margin-top:24px;color:#888;">¡Gracias por tu compra! ✨</p>
                      </div>
                    `;
                    html2pdf()
                      .set({
                        margin: 0,
                        filename: `Nota_BelleRose_${ventaId}.pdf`,
                        html2canvas: { scale: 2 },
                        jsPDF: { unit: 'mm', format: [216, 140], orientation: 'landscape' }
                      })
                      .from(element)
                      .save();
                  });
                }}
              >
                📥 Descargar nota PDF
              </button>

              {/* Imprimir nota */}
              <button
                className="w-full bg-[#b68d40] text-white py-2 rounded hover:bg-[#a57d36]"
                onClick={() => window.print()}
              >
                🖨 Imprimir nota
              </button>

              {/* Enviar por correo */}
              <button
                className="w-full bg-[#fdeaf2] text-[#b68d40] py-2 rounded hover:bg-[#fbd5e5]"
                onClick={() => {
                  import('emailjs-com').then(({ send }) => {
                    send(
                      'your_service_id',
                      'your_template_id',
                      {
                        to_email: emailTo,
                        venta_id: ventaId,
                        client_name: clientName,
                        total: `$${total.toFixed(2)}`
                      },
                      'your_user_id'
                    )
                    .then(() => alert('Correo enviado correctamente'))
                    .catch(err => alert('Error al enviar correo: ' + err.text));
                  });
                }}
              >
                ✉️ Enviar por correo
              </button>

              {/* Cerrar modal */}
              <button
                className="text-sm text-gray-500 mt-2 hover:underline"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
