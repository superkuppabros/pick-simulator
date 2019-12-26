export type Leader =
  | "エルフ"
  | "ウィッチ"
  | "ロイヤル"
  | "ドラゴン"
  | "ネクロマンサー"
  | "ヴァンパイア"
  | "ビショップ"
  | "ネメシス"
  | "ニュートラル";
export namespace LeaderName {
  export const Elf: Leader = "エルフ";
  export const Witch: Leader = "ウィッチ";
  export const Royal: Leader = "ロイヤル";
  export const Dragon: Leader = "ドラゴン";
  export const Necro: Leader = "ネクロマンサー";
  export const Vampire: Leader = "ヴァンパイア";
  export const Bishop: Leader = "ビショップ";
  export const Nemesis: Leader = "ネメシス";
  export const Neutral: Leader = "ニュートラル";
}
