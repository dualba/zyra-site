function App() {
  const [email, setEmail] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState({});

  // カウントダウン機能
  React.useEffect(() => {
    const targetDate = new Date('2024-10-01T00:00:00');
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
      
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // 実際の実装では、ここでメール送信やデータベース保存を行う
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-black to-green-400/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 w-full top-0 bg-black/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <img 
                src="https://cdn.abacus.ai/images/8f3b735f-3d3b-42af-8396-dabeed0a4446.png" 
                alt="Zyra Icon" 
                className="w-12 h-12 rounded-xl"
              />
              <img 
                src="https://cdn.abacus.ai/images/69a62588-9dae-4d6c-9dd8-79b05cbaaeb6.png" 
                alt="Zyra" 
                className="h-8"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-green-400 font-medium">Coming October 2024</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center px-6 py-2 bg-green-500/20 border border-green-500/50 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
            <span className="text-green-400 font-medium">Coming Soon</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="text-green-400">10月</span><br />
            広告制作が<br />
            <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">変わる</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            商品画像をアップロードするだけで、AIが最適な広告画像・動画を自動生成。<br />
            <span className="text-green-400 font-semibold">秒速で広告を、あなたの手に。</span>
          </p>

          {/* Countdown Timer */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-gray-300">リリースまで</h3>
            <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <div className="text-4xl font-bold text-green-400 mb-2">{timeLeft.days || 0}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">Days</div>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <div className="text-4xl font-bold text-green-400 mb-2">{timeLeft.hours || 0}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">Hours</div>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <div className="text-4xl font-bold text-green-400 mb-2">{timeLeft.minutes || 0}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">Minutes</div>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <div className="text-4xl font-bold text-green-400 mb-2">{timeLeft.seconds || 0}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">Seconds</div>
              </div>
            </div>
          </div>

          {/* Email Signup */}
          <div className="max-w-2xl mx-auto mb-16">
            {!isSubmitted ? (
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
                <h3 className="text-3xl font-bold mb-4">事前登録で特典GET</h3>
                <p className="text-gray-300 mb-6">リリース通知 + 初月無料 + 限定テンプレート</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="メールアドレスを入力"
                    className="flex-1 px-6 py-4 bg-black/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    required
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    事前登録する
                  </button>
                </form>
                
                <p className="text-xs text-gray-500 mt-4">
                  ※スパムメールは送信しません。いつでも配信停止できます。
                </p>
              </div>
            ) : (
              <div className="bg-green-500/20 border border-green-500/50 rounded-3xl p-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">登録完了！</h3>
                <p className="text-gray-300">リリース情報と特典をお送りします。お楽しみに！</p>
              </div>
            )}
          </div>

          {/* Preview Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">AI画像生成</h3>
              <p className="text-gray-400">商品画像から最適な広告クリエイティブを自動生成</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">動画自動生成</h3>
              <p className="text-gray-400">静止画から魅力的なショート動画を瞬時に作成</p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">秒速処理</h3>
              <p className="text-gray-400">数秒でプロ級のクリエイティブが完成</p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center mb-16">
            <p className="text-gray-400 mb-4">すでに多くの事業者様にご注目いただいています</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold">飲食店</div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="text-2xl font-bold">小売店</div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="text-2xl font-bold">ECオーナー</div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="text-2xl font-bold">インフルエンサー</div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img 
                src="https://cdn.abacus.ai/images/8f3b735f-3d3b-42af-8396-dabeed0a4446.png" 
                alt="Zyra Icon" 
                className="w-10 h-10 rounded-xl"
              />
              <img 
                src="https://cdn.abacus.ai/images/69a62588-9dae-4d6c-9dd8-79b05cbaaeb6.png" 
                alt="Zyra" 
                className="h-6"
              />
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-gray-400">
              <a href="mailto:info@zyra.jp" className="hover:text-green-400 transition-colors">
                info@zyra.jp
              </a>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-400 transition-colors">プライバシーポリシー</a>
                <a href="#" className="hover:text-green-400 transition-colors">利用規約</a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; 2024 Zyra. All rights reserved. | zyra.jp</p>
          </div>
        </div>
      </footer>
    </div>
  );
}