// Retratos estilizados dos filósofos em SVG inline (tons sépia/bronze)
// Projetados para renderizar de forma fluida tanto em 28px quanto em 64px.

export const PORTRAITS = {
  'Marco Aurélio': `
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <!-- Background Circle -->
      <circle cx="50" cy="50" r="46" fill="#1C1C1C" stroke="#8B5E2A" stroke-width="2"/>
      
      <!-- Imperial Laurel Wreath Background -->
      <path d="M30 45 C28 35, 42 22, 50 25 C58 22, 72 35, 70 45" stroke="#D4A574" stroke-width="3" stroke-linecap="round" fill="none"/>
      
      <!-- Shoulders & Toga -->
      <path d="M22 82 C22 70, 32 65, 50 65 C68 65, 78 70, 78 82" fill="#8B5E2A" />
      <path d="M32 65 L48 85 L56 85 L40 65 Z" fill="#B87333" />
      <path d="M50 65 L65 85 L70 82 L55 65 Z" fill="#D4A574" opacity="0.8" />
      
      <!-- Head & Neck -->
      <path d="M44 68 L44 58 L56 58 L56 68 Z" fill="#D4A574" />
      <path d="M37 40 C37 28, 63 28, 63 40 C63 50, 58 58, 50 58 C42 58, 37 50, 37 40 Z" fill="#D4A574" />
      
      <!-- Beard (Marco Aurélio is famous for his curly beard) -->
      <path d="M37 46 C35 55, 45 64, 50 64 C55 64, 65 55, 63 46 C60 48, 55 49, 50 49 C45 49, 40 48, 37 46 Z" fill="#8B5E2A" />
      <circle cx="43" cy="54" r="3" fill="#B87333"/>
      <circle cx="50" cy="56" r="3.5" fill="#B87333"/>
      <circle cx="57" cy="54" r="3" fill="#B87333"/>
      
      <!-- Eyes & Brow -->
      <path d="M44 38 H48" stroke="#0D0D0D" stroke-width="2" stroke-linecap="round"/>
      <path d="M52 38 H56" stroke="#0D0D0D" stroke-width="2" stroke-linecap="round"/>
      <path d="M44 35 C46 33, 49 35, 49 35" stroke="#8B5E2A" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <path d="M56 35 C54 33, 51 35, 51 35" stroke="#8B5E2A" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      
      <!-- Hair curls -->
      <path d="M37 38 C35 34, 38 30, 42 30 C40 28, 45 26, 50 28 C55 26, 60 28, 58 30 C62 30, 65 34, 63 38" fill="#8B5E2A"/>
    </svg>
  `.trim(),

  'Sêneca': `
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <!-- Background Circle -->
      <circle cx="50" cy="50" r="46" fill="#1C1C1C" stroke="#8B5E2A" stroke-width="2"/>
      
      <!-- Shoulders & Drapery -->
      <path d="M20 82 C20 72, 35 62, 50 62 C65 62, 80 72, 80 82" fill="#8B5E2A" />
      <!-- Roman Toga Folds -->
      <path d="M28 67 C35 64, 45 74, 50 82" stroke="#B87333" stroke-width="3" stroke-linecap="round" fill="none" />
      <path d="M50 62 C58 66, 68 76, 74 82" stroke="#D4A574" stroke-width="2.5" stroke-linecap="round" fill="none" />
      
      <!-- Neck -->
      <path d="M45 66 V58 H55 V66 Z" fill="#D4A574" />
      
      <!-- Head (Sênenca is depicted as older, balding on top, thoughtful) -->
      <path d="M38 42 C38 28, 62 28, 62 42 C62 52, 57 58, 50 58 C43 58, 38 52, 38 42 Z" fill="#D4A574" />
      
      <!-- Hair (Balding, hair on sides) -->
      <path d="M38 42 C36 40, 36 34, 42 32" stroke="#8B5E2A" stroke-width="3" stroke-linecap="round" fill="none" />
      <path d="M62 42 C64 40, 64 34, 58 32" stroke="#8B5E2A" stroke-width="3" stroke-linecap="round" fill="none" />
      <path d="M42 32 C45 30, 48 30, 50 31 C52 30, 55 30, 58 32" stroke="#8B5E2A" stroke-width="1.5" stroke-linecap="round" fill="none" />
      
      <!-- Short philosopher beard -->
      <path d="M40 48 C42 54, 48 57, 50 57 C52 57, 58 54, 60 48 C55 51, 45 51, 40 48 Z" fill="#8B5E2A" />
      
      <!-- Serious Expression -->
      <path d="M45 39 C46 38, 48 39, 48 39" stroke="#8B5E2A" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <path d="M55 39 C54 38, 52 39, 52 39" stroke="#8B5E2A" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <path d="M45 42 H47" stroke="#0D0D0D" stroke-width="2"/>
      <path d="M53 42 H55" stroke="#0D0D0D" stroke-width="2"/>
      <path d="M47 48 C48 49, 52 49, 53 48" stroke="#8B5E2A" stroke-width="1.5" stroke-linecap="round" fill="none"/>
    </svg>
  `.trim(),

  'Epicteto': `
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
      <!-- Background Circle -->
      <circle cx="50" cy="50" r="46" fill="#1C1C1C" stroke="#8B5E2A" stroke-width="2"/>
      
      <!-- Simple Slave/Philosopher Garb -->
      <path d="M25 82 C25 74, 33 68, 50 68 C67 68, 75 74, 75 82" fill="#8B5E2A" />
      <path d="M40 68 L50 82 L60 68" stroke="#B87333" stroke-width="3" stroke-linecap="round" fill="none" />
      
      <!-- Neck -->
      <path d="M45 70 V60 H55 V70 Z" fill="#D4A574" />
      
      <!-- Head (Epictetus has a simple head, short curly hair, humble look) -->
      <path d="M39 42 C39 30, 61 30, 61 42 C61 51, 56 57, 50 57 C44 57, 39 51, 39 42 Z" fill="#D4A574" />
      
      <!-- Humble curly hair & beard -->
      <path d="M38 38 C36 40, 36 44, 40 45" stroke="#8B5E2A" stroke-width="3.5" stroke-linecap="round" fill="none" />
      <path d="M62 38 C64 40, 64 44, 60 45" stroke="#8B5E2A" stroke-width="3.5" stroke-linecap="round" fill="none" />
      <path d="M40 32 C44 29, 48 30, 50 32 C52 30, 56 29, 60 32" stroke="#8B5E2A" stroke-width="3.5" stroke-linecap="round" fill="none" />
      
      <!-- Scruffy short beard -->
      <path d="M39 46 C37 54, 47 60, 50 60 C53 60, 63 54, 61 46 C58 48, 54 49, 50 49 C46 49, 42 48, 39 46 Z" fill="#8B5E2A" />
      
      <!-- Calm, wise eyes -->
      <circle cx="46" cy="40" r="1.5" fill="#0D0D0D"/>
      <circle cx="54" cy="40" r="1.5" fill="#0D0D0D"/>
      <path d="M44 38 Q46 36 48 38" stroke="#8B5E2A" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <path d="M56 38 Q54 36 52 38" stroke="#8B5E2A" stroke-width="1.5" stroke-linecap="round" fill="none"/>
      <path d="M47 46 Q50 48 53 46" stroke="#8B5E2A" stroke-width="1.5" stroke-linecap="round" fill="none" />
    </svg>
  `.trim()
};
