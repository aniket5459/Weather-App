declare module 'weather-icons-react' {
    import { FC } from 'react';

    export const WiThermometer: FC<{ size?: number, color?: string }>;
    export const WiHumidity: FC<{ size?: number, color?: string }>;
    export const WiStrongWind: FC<{ size?: number, color?: string }>;
    export const WiRainWind: FC<{ size?: number, color?: string }>;
    export const WiWindDeg: FC<{ size?: number, color?: string }>;
}
