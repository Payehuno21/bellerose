// src/pages/VentaDetalle.tsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function VentaDetalle() {
  const { id } = useParams();
  const [venta, setVenta] = useState(null);

  useEffect(() => {
    const fetchVenta = async () => {
      const ref = doc(db, 'ventas', id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setVenta(snap.data());
      }
    };
    fetchVenta();
  }, [id]);

  if (!venta) return <p className="text-center mt-10">Cargando venta #{id}...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-xl font-bold text-[#b68d40] mb-2">{venta.encabezado}</h1>
      <p><strong>Cliente:</strong> {venta.cliente}</p>
      <p><strong>Referencia:</strong> {venta.referencia}</p>
      <p><strong>Fecha:</strong> {new Date(venta.fecha.seconds * 1000).toLocaleString()}</p>
      <p><strong>Método de pago:</strong> {venta.metodoPago}</p>

      <h2 className="mt-4 font-semibold">Productos</h2>
      <ul className="list-disc list-inside text-sm">
        {venta.productos.map((item, i) => (
          <li key={i}>{item.quantity} x {item.name} = ${item.price * item.quantity}</li>
        ))}
      </ul>

      <div className="mt-4 border-t pt-2 text-right text-[#b68d40] font-semibold">
        <p>Subtotal: ${venta.subtotal.toFixed(2)}</p>
        {venta.iva > 0 && <p>IVA (16%): ${(venta.subtotal * venta.iva).toFixed(2)}</p>}
        <p>Total: ${venta.total.toFixed(2)}</p>
      </div>
    </div>
  );
}
