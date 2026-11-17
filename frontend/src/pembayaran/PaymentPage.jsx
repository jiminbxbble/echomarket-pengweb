import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { api } from '../lib/api';
import { ambilToken } from '../auth/sesi';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [alamat, setAlamat] = useState(null);
  const [cart, setCart] = useState({ items: [], subtotal: 150000 });
  const [memproses, setMemproses] = useState(false);

  useEffect(() => {
    if (!ambilToken()) return;
    let aktif = true;
    Promise.all([
      api.get('/addresses').catch(() => []),
      api.get('/cart').catch(() => null),
    ]).then(([addrs, cartRes]) => {
      if (!aktif) return;
      if (Array.isArray(addrs) && addrs.length > 0) {
        setAlamat(addrs.find((a) => a.utama) || addrs[0]);
      }
      if (cartRes?.items?.length > 0) {
        setCart(cartRes);
      }
    });
    return () => { aktif = false; };
  }, []);

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const ongkir = 15000;
  const biayaLayanan = 2000;
  const totalBarang = cart.items.reduce((s, it) => s + it.jumlah, 0) || 2;
  const subtotal = cart.subtotal || 150000;
  const totalTagihan = subtotal + ongkir + biayaLayanan;

  const handleCheckout = async () => {
    if (!selectedPayment) {
      alert('Silakan pilih metode pembayaran terlebih dahulu!');
      return;
    }

    if (ambilToken() && cart.items.length > 0) {
      setMemproses(true);
      try {
        const alamatTeks = alamat
          ? `${alamat.penerima} (${alamat.telepon}) - ${alamat.detail}, ${alamat.kota}, ${alamat.provinsi}`
          : 'Jl. Telekomunikasi No. 1, Bandung, Jawa Barat';
        const order = await api.post('/orders', {
          metodeBayar: selectedPayment,
          alamatKirim: alamatTeks,
          ongkir: ongkir + biayaLayanan,
        });
        await api.patch(`/orders/${order.id}/status`, { status: 'DIBAYAR' }).catch(() => {});
        alert(`Pesanan #EM-${order.id} berhasil dibuat & dibayar dengan metode: ${selectedPayment}`);
        navigate('/marketplace');
        return;
      } catch (err) {
        alert(err.message || 'Gagal memproses pembayaran');
        return;
      } finally {
        setMemproses(false);
      }
    }

    alert(`Pesanan berhasil dibuat dengan metode: ${selectedPayment}`);
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="payment-page-container">
      <div className="payment-content">
        
        <div className="payment-left-column">
          <section className="payment-section">
            <h2>Alamat Pengiriman</h2>
            <div className="address-card">
              <p><strong>{alamat?.penerima || 'Petrus Brammonsas Agustino'}</strong></p>
              <p>{alamat?.detail || 'Jl. Telekomunikasi No. 1, Terusan Buahbatu'}</p>
              <p>{alamat ? `${alamat.kota}, ${alamat.provinsi}` : 'Bandung, Jawa Barat, 40257'}</p>
              <p>{alamat?.telepon || '0812-XXXX-XXXX'}</p>
              <button className="btn-edit-address" onClick={() => navigate('/profil')}>Ubah Alamat</button>
            </div>
          </section>

          <section className="payment-section">
            <h2>Metode Pembayaran</h2>
            <div className="payment-methods-grid">
              <div 
                className={`payment-method-card ${selectedPayment === 'BCA' ? 'active' : ''}`}
                onClick={() => handlePaymentSelect('BCA')}
              >
                <div className="method-icon">BCA</div>
                <span>Transfer BCA</span>
              </div>
              <div 
                className={`payment-method-card ${selectedPayment === 'Mandiri' ? 'active' : ''}`}
                onClick={() => handlePaymentSelect('Mandiri')}
              >
                <div className="method-icon">MDR</div>
                <span>Mandiri Virtual Account</span>
              </div>
              <div 
                className={`payment-method-card ${selectedPayment === 'Gopay' ? 'active' : ''}`}
                onClick={() => handlePaymentSelect('Gopay')}
              >
                <div className="method-icon">GPY</div>
                <span>GoPay</span>
              </div>
              <div 
                className={`payment-method-card ${selectedPayment === 'COD' ? 'active' : ''}`}
                onClick={() => handlePaymentSelect('COD')}
              >
                <div className="method-icon">COD</div>
                <span>Bayar di Tempat</span>
              </div>
            </div>
          </section>
        </div>

        <div className="payment-right-column">
          <section className="summary-card">
            <h2>Ringkasan Belanja</h2>
            
            <div className="summary-items">
              <div className="summary-row">
                <span>Total Harga ({totalBarang} barang)</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="summary-row">
                <span>Total Ongkos Kirim</span>
                <span>Rp {ongkir.toLocaleString('id-ID')}</span>
              </div>
              <div className="summary-row">
                <span>Biaya Layanan</span>
                <span>Rp {biayaLayanan.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <hr className="summary-divider" />

            <div className="summary-total">
              <span>Total Tagihan</span>
              <span className="total-price">Rp {totalTagihan.toLocaleString('id-ID')}</span>
            </div>

            <button 
              className={`btn-pay-now ${selectedPayment ? 'ready' : ''}`} 
              onClick={handleCheckout}
              disabled={memproses}
            >
              {memproses ? 'Memproses...' : 'Bayar Sekarang'}
            </button>
          </section>
        </div>

      </div>
    </div>
    </>
  );
};

export default PaymentPage;