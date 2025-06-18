import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiMail, FiMessageSquare } from 'react-icons/fi';
import FAQAccordion from '../components/FAQAccordion';

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const generalFaqs = [
    {
      question: "Apa itu BubblePi?",
      answer: "BubblePi adalah platform yang menyediakan akun premium untuk berbagai aplikasi seperti Netflix, Canva, dan tools AI dengan harga yang lebih terjangkau melalui sistem sharing, invite, atau private."
    },
    {
      question: "Apakah akun yang dijual legal?",
      answer: "Ya, semua akun yang kami jual adalah akun yang dibeli secara resmi dan legal. Kami hanya menjual akun dengan model sharing atau invite untuk menghemat biaya bagi pelanggan."
    },
    {
      question: "Berapa lama proses pengiriman akun setelah pembayaran?",
      answer: "Proses pengiriman akun biasanya dilakukan dalam waktu 5-30 menit setelah pembayaran berhasil dikonfirmasi, tergantung antrian dan jam operasional kami (09.00 - 21.00 WIB)."
    }
  ];
  
  const accountFaqs = [
    {
      question: "Apa yang dimaksud dengan akun 1p2u, 1p1u, dan Private?",
      answer: "1p2u artinya 1 profile 2 user (shared), 1p1u artinya 1 profile 1 user, sedangkan Private artinya akun yang sepenuhnya menjadi milik Anda tanpa sharing dengan pengguna lain."
    },
    {
      question: "Apakah saya bisa mengubah password akun?",
      answer: "Untuk akun sharing dan invite, Anda tidak diperbolehkan mengubah password atau informasi profil. Hanya akun private yang dapat Anda ubah password dan pengaturannya."
    },
    {
      question: "Apa yang terjadi jika saya mengubah password pada akun sharing?",
      answer: "Mengubah password pada akun sharing akan menyebabkan akun tidak dapat digunakan oleh pengguna lain, yang melanggar ketentuan layanan kami. Jika ini terjadi, Anda akan kehilangan garansi."
    }
  ];
  
  const paymentFaqs = [
    {
      question: "Metode pembayaran apa saja yang tersedia?",
      answer: "Kami menerima berbagai metode pembayaran melalui Tripay gateway, termasuk transfer bank (BCA, BNI, BRI, Mandiri), e-wallet (OVO, DANA, Gopay, LinkAja), QRIS, dan minimarket (Alfamart, Indomaret)."
    },
    {
      question: "Bagaimana cara melakukan pembayaran?",
      answer: "Setelah memilih produk dan varian yang diinginkan, tambahkan ke keranjang dan lanjutkan ke checkout. Anda akan diarahkan ke halaman pembayaran Tripay untuk menyelesaikan transaksi dengan metode pembayaran pilihan Anda."
    },
    {
      question: "Apakah ada biaya tambahan untuk pembayaran?",
      answer: "Ya, terdapat pajak sebesar 11% yang akan ditambahkan pada total pembelian Anda. Biaya tambahan untuk administrasi payment gateway mungkin berlaku tergantung metode pembayaran yang dipilih."
    }
  ];
  
  const supportFaqs = [
    {
      question: "Bagaimana jika akun bermasalah selama masa berlaku?",
      answer: "Kami memberikan garansi full replace untuk semua akun selama masa berlaku. Jika terjadi masalah, silakan hubungi admin kami melalui WhatsApp untuk mendapatkan penggantian."
    },
    {
      question: "Berapa lama jam operasional layanan pelanggan?",
      answer: "Tim layanan pelanggan kami tersedia setiap hari dari jam 09.00 hingga 21.00 WIB. Pertanyaan atau masalah yang diajukan di luar jam operasional akan ditanggapi pada jam operasional berikutnya."
    },
    {
      question: "Apakah bisa perpanjang akun yang sudah dibeli?",
      answer: "Tentu saja bisa. Kami menyediakan layanan perpanjangan untuk semua jenis akun dengan harga yang sama seperti pembelian awal. Silakan hubungi kami 1-3 hari sebelum masa aktif akun Anda berakhir."
    }
  ];
  
  const renderFaqs = () => {
    switch (activeTab) {
      case 'account':
        return accountFaqs;
      case 'payment':
        return paymentFaqs;
      case 'support':
        return supportFaqs;
      default:
        return generalFaqs;
    }
  };
  
  return (
    <div className="container-custom py-24 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-pink-soft">Home</Link>
        <FiChevronRight className="mx-2" />
        <span className="text-gray-700">FAQ</span>
      </div>
      
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-navy mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Temukan jawaban untuk pertanyaan umum tentang layanan kami. Jika Anda memiliki pertanyaan lain, 
          jangan ragu untuk menghubungi kami.
        </p>
      </div>
      
      {/* FAQ Categories Tabs */}
      <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === 'general'
              ? 'text-pink-soft border-b-2 border-pink-soft'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Umum
        </button>
        
        <button
          onClick={() => setActiveTab('account')}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === 'account'
              ? 'text-pink-soft border-b-2 border-pink-soft'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Akun
        </button>
        
        <button
          onClick={() => setActiveTab('payment')}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === 'payment'
              ? 'text-pink-soft border-b-2 border-pink-soft'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Pembayaran
        </button>
        
        <button
          onClick={() => setActiveTab('support')}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === 'support'
              ? 'text-pink-soft border-b-2 border-pink-soft'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Dukungan
        </button>
      </div>
      
      {/* Custom FAQ Accordion */}
      <div className="max-w-3xl mx-auto mb-16">
        {renderFaqs().map((faq, index) => (
          <div key={index} className="border-b border-gray-200 py-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
      
      {/* Contact Section */}
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-navy mb-2 text-center">Belum Menemukan Jawaban?</h2>
        <p className="text-gray-600 text-center mb-8">
          Jika Anda memiliki pertanyaan lain yang tidak tercantum di sini, jangan ragu untuk menghubungi kami.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="w-12 h-12 bg-pink-soft/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMessageSquare className="w-6 h-6 text-pink-soft" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-4">
              Dapatkan bantuan cepat melalui WhatsApp kami
            </p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block btn-primary"
            >
              Chat dengan Kami
            </a>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="w-12 h-12 bg-pink-soft/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMail className="w-6 h-6 text-pink-soft" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600 mb-4">
              Kirim pertanyaan Anda melalui email
            </p>
            <a
              href="mailto:info@bubblepi.com"
              className="inline-block btn-primary"
            >
              Email Kami
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 