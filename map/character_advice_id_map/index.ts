const adviceId: any = {
    "-401": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "輔助" },
    "-402": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "副C" },
    "-403": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "主C" },
    "-207": { icon: require("../../assets/images/ui_icon/path_the_abundance.webp"), name: "豐饒" },
    "-206": { icon: require("../../assets/images/ui_icon/path_the_harmony.webp"), name: "同諧" },
    "-205": { icon: require("../../assets/images/ui_icon/path_the_destruction.webp"), name: "毀滅" },
    "-204": { icon: require("../../assets/images/ui_icon/path_the_nihility.webp"), name: "虛無" },
    "-203": { icon: require("../../assets/images/ui_icon/path_the_erudition.webp"), name: "智識" },
    "-202": { icon: require("../../assets/images/ui_icon/path_the_hunt.webp"), name: "巡獵" },
    "-201": { icon: require("../../assets/images/ui_icon/path_the_destruction.webp"), name: "存護" },
    "-107": { icon: require("../../assets/images/ui_icon/element_quantum.webp"), name: "量子" },
    "-106": { icon: require("../../assets/images/ui_icon/element_lightning.webp"), name: "雷" },
    "-105": { icon: require("../../assets/images/ui_icon/element_physical.webp"), name: "物理" },
    "-104": { icon: require("../../assets/images/ui_icon/element_imaginary.webp"), name: "虛數" },
    "-103": { icon: require("../../assets/images/ui_icon/element_fire.webp"), name: "火" },
    "-102": { icon: require("../../assets/images/ui_icon/element_wind.webp"), name: "風" },
    "-101": { icon: require("../../assets/images/ui_icon/element_ice.webp"), name: "冰" },
    "-301": { icon: require("../../assets/images/ui_icon/vocchi.webp"), name: "DOT" },
    "-302": { icon: require("../../assets/images/ui_icon/vocchi.webp"), name: "DOT易傷" },
    "-303": { icon: require("../../assets/images/ui_icon/ic_kurukuru.webp"), name: "KuruKuru" },
    "-304": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "分擔傷害" },
    "-305": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "代價" },
    "-306": { icon: require("../../assets/images/ui_icon/ic_energy_regeneration_rate.webp"), name: "充能" },
    "-307": { icon: require("../../assets/images/ui_icon/ic_speed.webp"), name: "加速" },
    "-308": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "全體攻擊" },
    "-309": { icon: require("../../assets/images/ui_icon/ic_outgoing_healing_boost.webp"), name: "全體治療" },
    "-310": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "全體傷害" },
    "-311": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "再動" },
    "-312": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "再現" },
    "-313": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "回復" },
    "-314": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "自我恢復" },
    "-315": { icon: require("../../assets/images/ui_icon/ic_atk.webp"), name: "攻擊加成" },
    "-316": { icon: require("../../assets/images/ui_icon/ic_break_dmg.webp"), name: "易傷" },
    "-317": { icon: require("../../assets/images/ui_icon/ic_outgoing_healing_boost.webp"), name: "治療" },
    "-318": { icon: require("../../assets/images/ui_icon/ic_outgoing_healing_boost.webp"), name: "持續恢復" },
    "-319": { icon: require("../../assets/images/ui_icon/ic_effect_res.webp"), name: "降抗" },
    "-320": { icon: require("../../assets/images/ui_icon/ic_effect_hit_rate.webp"), name: "弱點植入" },
    "-321": { icon: require("../../assets/images/ui_icon/ic_effect_hit_rate.webp"), name: "弱點擊破" },
    "-322": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "特殊機制" },
    "-323": { icon: require("../../assets/images/ui_icon/ic_energy_regeneration_rate.webp"), name: "能量回復" },
    "-324": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "追加攻擊" },
    "-325": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "逃課大師" },
    "-326": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "淨化" },
    "-327": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "產點" },
    "-328": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "終結技" },
    "-329": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "復活" },
    "-330": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "提前行動" },
    "-331": { icon: require("../../assets/images/ui_icon/ic_break_effect.webp"), name: "減防" },
    "-332": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "減速" },
    "-333": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "減傷" },
    "-334": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "解除狀態" },
    "-335": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "嘲諷" },
    "-336": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "增傷" },
    "-337": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "擴散攻擊" },
    "-338": { icon: require("../../assets/images/ui_icon/ic_crit_rate.webp"), name: "暴擊" },
    "-339": { icon: require("../../assets/images/ui_icon/ic_crit_rate.webp"), name: "暴擊加成" },
    "-340": { icon: require("../../assets/images/ui_icon/ic_crit_rate.webp"), name: "暴擊率加成" },
    "-341": { icon: require("../../assets/images/ui_icon/ic_crit_dmg.webp"), name: "暴擊傷害" },
    "-342": { icon: require("../../assets/images/ui_icon/ic_crit_dmg.webp"), name: "暴擊傷害加成" },
    "-343": { icon: require("../../assets/images/ui_icon/ic_def.webp"), name: "護盾" },
    "-344": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "體系核心" },
    "-345": { icon: require("../../assets/images/ui_icon/ic_break_effect.webp"), name: "降低防禦" },
    "-346": { icon: require("../../assets/images/ui_icon/ic_unknown.webp"), name: "禁錮" },

};

export default adviceId;