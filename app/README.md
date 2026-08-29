# Fyren App — Expo React Native

Körbar app baserad på Figma-designen.

## Kom igång

```bash
cd app
npm install
npx expo start
```

Scanna QR-koden med Expo Go (iOS/Android) för att testa.

## Projektstruktur

```
app/
├─ src/
│  ├─ app/           # Expo Router-skärmar
│  │  ├─ (tabs)/     # Tab-navigation (Liv, Fyrmål, Dagbok, Mer)
│  │  ├─ checkin     # Välmående check-in
│  │  ├─ skriv       # Dagboksskrivning
│  │  ├─ ritual      # Ritual-timer
│  │  ├─ tacksamhet  # Tacksamhetsövning
│  │  ├─ notiser     # Notifikationer
│  │  └─ familjekalender
│  ├─ components/    # Återanvändbara komponenter
│  ├─ theme/         # Design tokens från Figma
│  └─ store/         # State management & mock data
├─ app.json          # Expo-config
└─ package.json
```

## Design Tokens

Alla färger, typografi och spacing är extraherade från Figma-filen och finns i `src/theme/`.

## Skärmar med funktionalitet

- **Hem** — Vanechecklista, kompassråd, streak, snabbåtgärder
- **Fyrmål** — Mål med progressringar, milstolpar, streaks
- **Dagbok** — Reflektionslista med taggar, skriv-streak, FAB
- **Mer** — Profil, inställningar med toggles, stats
- **Check-in** — Humörväljare + fritext
- **Dagboksskrivning** — Prompts, taggar, humörval
- **Ritual-timer** — Nedräkningstimer med play/paus/stopp
- **Tacksamhet** — 3 tacksamhets-inputs
- **Notiser** — Notifikationskort med oläst-status
- **Familjekalender** — Månadskalender med familjehändelser
