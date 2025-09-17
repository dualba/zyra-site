// ====== 設定：Google Apps Script Web アプリURLを入れてください ======
const FORM_ENDPOINT = "https://script.google.com/macros/s/REPLACE_WITH_DEPLOYED_WEB_APP_URL/exec"; // ←差し替え

// CORS を GAS 側で許可してください（テンプレは同梱の .gs を使用）
const formEl = document.getElementById('waitlistForm');
const msgEl = document.getElementById('msg');
const submitBtn = document.getElementById('submitBtn');

function toast(html, cls='success'){
  msgEl.className = cls;
  msgEl.innerHTML = html;
}

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  msgEl.className=''; msgEl.textContent='';
  if (!formEl.reportValidity()) return;

  const data = Object.fromEntries(new FormData(formEl));
  // bot対策（honeypot）
  if (data.note && data.note.trim() !== "") {
    toast("検証に失敗しました。もう一度お試しください。","error");
    return;
  }
  submitBtn.disabled = true; submitBtn.textContent = "送信中...";

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        businessType: data.businessType,
        channel: data.channel || '',
        request: data.request || '',
        consent: !!data.consent,
        ts: new Date().toISOString()
      })
    });

    if (!res.ok) throw new Error('Failed: ' + res.status);
    const json = await res.json();
    toast(`登録ありがとうございます！<br/>受付番号: <b>${json.id || '—'}</b>`, 'success');
    formEl.reset();
  } catch (err) {
    console.error(err);
    toast("送信に失敗しました。時間をおいてお試しください。","error");
  } finally {
    submitBtn.disabled = false; submitBtn.textContent = "登録する";
  }
});
