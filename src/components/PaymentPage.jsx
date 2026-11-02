import React, { useState } from 'react';
import './PaymentPage.css';

const PaymentPage = () => {
  const [selectedPayment, setSelectedPayment] = useState('');

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handleCheckout = () => {
    if (!selectedPayment) {
      alert('Silakan pilih metode pembayaran terlebih dahulu!');
      return;
    }
    alert(`Pesanan berhasil dibuat dengan metode: ${selectedPayment}`);
  };

  return (
    <div className="payment-page-container">
      <div className="payment-content">
        
        {/* Kolom Kiri: Detail Pengiriman & Pesanan */}
        <div className="payment-left-column">
          <section className="payment-section">
            <h2>Alamat Pengiriman</h2>
            <div className="address-card">
              <p><strong>Petrus Brammonsas Agustino</strong></p>
              <p>Jl. Telekomunikasi No. 1, Terusan Buahbatu</p>
              <p>Bandung, Jawa Barat, 40257</p>
              <p>0812-XXXX-XXXX</p>
              <button className="btn-edit-address">Ubah Alamat</button>
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

        {/* Kolom Kanan: Ringkasan Belanja */}
        <div className="payment-right-column">
          <section className="summary-card">
            <h2>Ringkasan Belanja</h2>
            
            <div className="summary-items">
              <div className="summary-row">
                <span>Total Harga (2 barang)</span>
                <span>Rp 150.000</span>
              </div>
              <div className="summary-row">
                <span>Total Ongkos Kirim</span>
                <span>Rp 15.000</span>
              </div>
              <div className="summary-row">
                <span>Diskon</span>
                <span className="discount">- Rp 10.000</span>
              </div>
              <div className="summary-row">
                <span>Biaya Layanan</span>
                <span>Rp 2.000</span>
              </div>
            </div>

            <hr className="summary-divider" />

            <div className="summary-total">
              <span>Total Tagihan</span>
              <span className="total-price">Rp 157.000</span>
            </div>

            <button 
              className={`btn-pay-now ${selectedPayment ? 'ready' : ''}`} 
              onClick={handleCheckout}
            >
              Bayar Sekarang
            </button>
          </section>
        </div>

      </div>
    </div>
  );
};

export default PaymentPage;