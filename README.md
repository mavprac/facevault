# FaceVault v2 — Upgrade Notes

## What changed from v1

### 1. Multi-descriptor matching (biggest accuracy fix)
Instead of storing one 128-float descriptor per person, you can now capture **2–5 shots** of each person from different angles and lighting. All descriptors are stored and matched using `face-api.js`'s built-in `FaceMatcher`, which finds the minimum distance across all reference shots. This dramatically improves recognition accuracy for varying conditions.

### 2. Duplicate detection on register
Before saving a new person, the app compares the new descriptor against everyone already in the vault. If a match is found at < 40% distance, it warns you with a banner showing the likely duplicate's name. A second Save click bypasses the warning if intentional.

### 3. Camera stops when switching panels
Cameras are now properly stopped (`getTracks().forEach(t => t.stop())`) when navigating away from Register or Identify panels. No more background CPU drain from idle camera streams.

### 4. Detection loop pauses when tab is hidden
Using the `visibilitychange` event, all `requestAnimationFrame` loops are cancelled when the tab goes to background and resumed when it returns.

### 5. Honest confidence display
Instead of `(1 - distance) * 100%` which inflates borderline scores, the result now shows a visual distance bar with the actual similarity value. Green bar for high confidence (< 0.35), gold for likely match (0.35–0.5).

### 6. Better service worker caching
- Model files (large, immutable) use **cache-first** strategy
- Static assets use **network-first with cache fallback**
- Old caches are cleaned up on activate
- `DB_NAME` bumped to `FaceVaultDB2` so old v1 data doesn't interfere

### 7. Vault shows shot count
Each gallery card now shows how many reference shots were registered, so you know which entries are well-calibrated vs. single-shot.

---

## Deploy to GitHub Pages

1. Replace all files in your repo with these 3 files + your existing `icons/` folder
2. Commit and push
3. GitHub Pages will rebuild automatically (~1 min)

```
facevault/
├── index.html      ← main app (replace)
├── sw.js           ← service worker (replace)
├── manifest.json   ← PWA manifest (replace)
└── icons/          ← keep existing icons
    ├── icon-192.png
    ├── icon-512.png
    └── apple-touch-icon.png
```

> **Note:** The new app uses `FaceVaultDB2` as the IndexedDB name, so it starts fresh — your v1 registered faces won't carry over. You'll need to re-register everyone.

---

## Tips for best accuracy

- Register 3–5 shots per person: front-facing, slight left/right turns, different lighting
- Well-lit photos give much more reliable descriptors
- The green "High Confidence" badge means distance < 0.35 — very reliable
- Gold "Likely Match" (0.35–0.5) is still correct most of the time but worth a double-check
