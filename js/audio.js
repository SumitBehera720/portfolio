// Web Audio API Synthesizer for tactile UI sound effects
// Lightweight, zero audio file downloads, pure mathematical frequency synthesis
(function () {
  let audioCtx = null;
  let isMuted = localStorage.getItem('sb_audio_muted') === 'true'; // Default muted or remember state

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  const SoundFX = {
    isMuted: () => isMuted,

    toggleMute: () => {
      isMuted = !isMuted;
      localStorage.setItem('sb_audio_muted', isMuted);
      updateMuteUI();
      if (!isMuted) {
        SoundFX.playPop();
      }
      return isMuted;
    },

    playHover: () => {
      if (isMuted) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } catch (e) {}
    },

    playClick: () => {
      if (isMuted) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch (e) {}
    },

    playSuccess: () => {
      if (isMuted) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 chord
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.03, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.35);
        });
      } catch (e) {}
    },

    playPop: () => {
      if (isMuted) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.035, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } catch (e) {}
    }
  };

  function updateMuteUI() {
    const audioBtns = document.querySelectorAll('.audio-toggle-btn');
    audioBtns.forEach((btn) => {
      const icon = btn.querySelector('.audio-icon');
      const text = btn.querySelector('.audio-label');
      if (isMuted) {
        btn.classList.remove('active');
        btn.setAttribute('aria-label', 'Sound Muted. Click to unmute.');
        if (text) text.textContent = 'Muted';
        if (icon) icon.setAttribute('data-lucide', 'volume-x');
      } else {
        btn.classList.add('active');
        btn.setAttribute('aria-label', 'Sound Active. Click to mute.');
        if (text) text.textContent = 'Sound On';
        if (icon) icon.setAttribute('data-lucide', 'volume-2');
      }
    });
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Attach interactive sounds to buttons and links with data-sound or general clickable elements
  document.addEventListener('DOMContentLoaded', () => {
    updateMuteUI();

    document.querySelectorAll('.audio-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        SoundFX.toggleMute();
      });
    });

    // Delegation for interactive elements
    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, a, .interactive-card, .tab-btn');
      if (target && !target.classList.contains('audio-toggle-btn')) {
        SoundFX.playClick();
      }
    });

    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('.interactive-card, .cyber-btn, .tab-btn, .nav-link');
      if (target) {
        SoundFX.playHover();
      }
    });
  });

  window.SoundFX = SoundFX;
})();

