/*
 * Project Honkai Stargazer (崩壞•星穹觀星者) was
 * Created & Develop by Voc-夜芷冰 , Programmer of Xectorda
 * Copyright © 2023 Xectorda 版權所有
 */

package com.voc.honkai_stargazer.util;

import static com.voc.honkai_stargazer.util.LoadAssestData.LoadAssestData;

import android.app.DownloadManager;
import android.content.Context;
import android.net.Uri;
import android.text.Html;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.style.ForegroundColorSpan;

import com.voc.honkai_stargazer.R;
import com.voc.honkai_stargazer.data.HSRItem;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;

public class ItemRSS {

    public static final String LANG_EN = "en"; //DEFAULT CASE, now for beta test.
    public static final String LANG_ZH_HK = "zh_hk";
    public static final String LANG_ZH_CN = "zh_cn";
    public static final String LANG_RU = "ru";
    public static final String LANG_UK = "uk";
    public static final String LANG_JA_JP = "jp_jp";

    public static final String ELEMENT_FIRE = "Fire";
    public static final String ELEMENT_ICE = "Ice";
    public static final String ELEMENT_PHYSICAL = "Physical";
    public static final String ELEMENT_WIND = "Wind";
    public static final String ELEMENT_LIGHTNING = "Lightning";
    public static final String ELEMENT_QUANTUM = "Quantum";
    public static final String ELEMENT_IMAGINARY = "Imaginary";

    public static final String PATH_PRESERVATION = "Preservation";
    public static final String PATH_DESTRUCTION = "Destruction";
    public static final String PATH_ABSTRUCTION = "Abundance";
    public static final String PATH_NIHILITY = "Nihility";
    public static final String PATH_HARMONY = "Harmony";
    public static final String PATH_ERUDITION = "Erudition";
    public static final String PATH_HUNT = "Hunt";

    public static final String STATUS_RELEASED = "RELEASED";
    public static final String STATUS_UPCOMING = "UPCOMING";
    public static final String STATUS_BETA = "BETA";

    public static final String SEX_MALE = "Male";
    public static final String SEX_FEMALE = "Female";

    public static final String TYPE_CHARACTER = "Character";
    public static final String TYPE_LIGHTCONE = "Lightcone";
    public static final String TYPE_RELIC = "Relic";
    //public static final String TYPE_ORNAMENT = "Ornament";

    public static final int MATERIAL_CHARACTER_EXP_MATERIAL = 1;
    public static final int MATERIAL_CHARACTER_ASCENSION_MATERIALS = 2;
    public static final int MATERIAL_TRACE_MATERIAL_LIGHTCONE_ASCENSION_MATERIALS = 3;
    public static final int MATERIAL_TRACE_MATERIALS = 4;
    public static final int MATERIAL_TRACE_MATERIAL_CHARACTER_ASCENSION_MATERIALS = 7;
    public static final int MATERIAL_COMMON_CURRENCY = 11;

    public int[] getCharByName(String charNameInFile){
        switch (charNameInFile){
            case "Arlan" : return new int[]{R.drawable.arlan_icon, R.drawable.arlan_splash, R.drawable.arlan_eidolon1, R.drawable.arlan_eidolon2, R.drawable.arlan_eidolon3, R.drawable.arlan_eidolon4, R.drawable.arlan_eidolon5, R.drawable.arlan_eidolon6};
            case "Asta" : return new int[]{R.drawable.asta_icon, R.drawable.asta_splash, R.drawable.asta_eidolon1, R.drawable.asta_eidolon2, R.drawable.asta_eidolon3, R.drawable.asta_eidolon4, R.drawable.asta_eidolon5, R.drawable.asta_eidolon6};
            case "Bailu" : return new int[]{R.drawable.bailu_icon, R.drawable.bailu_splash, R.drawable.bailu_eidolon1, R.drawable.bailu_eidolon2, R.drawable.bailu_eidolon3, R.drawable.bailu_eidolon4, R.drawable.bailu_eidolon5, R.drawable.bailu_eidolon6};
            case "Blade" : return new int[]{R.drawable.blade_icon, R.drawable.blade_splash, R.drawable.ico_lost_img, R.drawable.ico_lost_img, R.drawable.ico_lost_img, R.drawable.ico_lost_img, R.drawable.ico_lost_img, R.drawable.ico_lost_img};
            case "Bronya" : return new int[]{R.drawable.bronya_icon, R.drawable.bronya_splash, R.drawable.bronya_eidolon1, R.drawable.bronya_eidolon2, R.drawable.bronya_eidolon3, R.drawable.bronya_eidolon4, R.drawable.bronya_eidolon5, R.drawable.bronya_eidolon6};
            case "Clara" : return new int[]{R.drawable.clara_icon, R.drawable.clara_splash, R.drawable.clara_eidolon1, R.drawable.clara_eidolon2, R.drawable.clara_eidolon3, R.drawable.clara_eidolon4, R.drawable.clara_eidolon5, R.drawable.clara_eidolon6};
            case "Dan Heng" : return new int[]{R.drawable.dan_heng_icon, R.drawable.dan_heng_splash, R.drawable.dan_heng_eidolon1, R.drawable.dan_heng_eidolon2, R.drawable.dan_heng_eidolon3, R.drawable.dan_heng_eidolon4, R.drawable.dan_heng_eidolon5, R.drawable.dan_heng_eidolon6};
            case "Gepard" : return new int[]{R.drawable.gepard_icon, R.drawable.gepard_splash, R.drawable.gepard_eidolon1, R.drawable.gepard_eidolon2, R.drawable.gepard_eidolon3, R.drawable.gepard_eidolon4, R.drawable.gepard_eidolon5, R.drawable.gepard_eidolon6};
            case "Herta" : return new int[]{R.drawable.herta_icon, R.drawable.herta_splash, R.drawable.herta_eidolon1, R.drawable.herta_eidolon2, R.drawable.herta_eidolon3, R.drawable.herta_eidolon4, R.drawable.herta_eidolon5, R.drawable.herta_eidolon6};
            case "Himeko" : return new int[]{R.drawable.himeko_icon, R.drawable.himeko_splash, R.drawable.himeko_eidolon1, R.drawable.himeko_eidolon2, R.drawable.himeko_eidolon3, R.drawable.himeko_eidolon4, R.drawable.himeko_eidolon5, R.drawable.himeko_eidolon6};
            case "Hook" : return new int[]{R.drawable.hook_icon, R.drawable.hook_splash, R.drawable.hook_eidolon1, R.drawable.hook_eidolon2, R.drawable.hook_eidolon3, R.drawable.hook_eidolon4, R.drawable.hook_eidolon5, R.drawable.hook_eidolon6};
            case "Jing Yuan" : return new int[]{R.drawable.jing_yuan_icon, R.drawable.jing_yuan_splash, R.drawable.jing_yuan_eidolon1, R.drawable.jing_yuan_eidolon2, R.drawable.jing_yuan_eidolon3, R.drawable.jing_yuan_eidolon4, R.drawable.jing_yuan_eidolon5, R.drawable.jing_yuan_eidolon6};
            case "Kafka" : return new int[]{R.drawable.kafka_icon, R.drawable.kafka_splash, R.drawable.kafka_eidolon1, R.drawable.kafka_eidolon2, R.drawable.kafka_eidolon3, R.drawable.kafka_eidolon4, R.drawable.kafka_eidolon5, R.drawable.kafka_eidolon6};
            case "Luocha" : return new int[]{R.drawable.luocha_icon, R.drawable.luocha_splash, R.drawable.luocha_eidolon1, R.drawable.luocha_eidolon2, R.drawable.luocha_eidolon3, R.drawable.luocha_eidolon4, R.drawable.luocha_eidolon5, R.drawable.luocha_eidolon6};
            case "March 7th" : return new int[]{R.drawable.march_7th_icon, R.drawable.march_7th_splash, R.drawable.march_7th_eidolon1, R.drawable.march_7th_eidolon2, R.drawable.march_7th_eidolon3, R.drawable.march_7th_eidolon4, R.drawable.march_7th_eidolon5, R.drawable.march_7th_eidolon6};
            case "Natasha" : return new int[]{R.drawable.natasha_icon, R.drawable.natasha_splash, R.drawable.natasha_eidolon1, R.drawable.natasha_eidolon2, R.drawable.natasha_eidolon3, R.drawable.natasha_eidolon4, R.drawable.natasha_eidolon5, R.drawable.natasha_eidolon6};
            case "Pela" : return new int[]{R.drawable.pela_icon, R.drawable.pela_splash, R.drawable.pela_eidolon1, R.drawable.pela_eidolon2, R.drawable.pela_eidolon3, R.drawable.pela_eidolon4, R.drawable.pela_eidolon5, R.drawable.pela_eidolon6};
            case "Qingque" : return new int[]{R.drawable.qingque_icon, R.drawable.qingque_splash, R.drawable.qingque_eidolon1, R.drawable.qingque_eidolon2, R.drawable.qingque_eidolon3, R.drawable.qingque_eidolon4, R.drawable.qingque_eidolon5, R.drawable.qingque_eidolon6};
            case "Sampo" : return new int[]{R.drawable.sampo_icon, R.drawable.sampo_splash, R.drawable.sampo_eidolon1, R.drawable.sampo_eidolon2, R.drawable.sampo_eidolon3, R.drawable.sampo_eidolon4, R.drawable.sampo_eidolon5, R.drawable.sampo_eidolon6};
            case "Seele" : return new int[]{R.drawable.seele_icon, R.drawable.seele_splash, R.drawable.seele_eidolon1, R.drawable.seele_eidolon2, R.drawable.seele_eidolon3, R.drawable.seele_eidolon4, R.drawable.seele_eidolon5, R.drawable.seele_eidolon6};
            case "Serval" : return new int[]{R.drawable.serval_icon, R.drawable.serval_splash, R.drawable.serval_eidolon1, R.drawable.serval_eidolon2, R.drawable.serval_eidolon3, R.drawable.serval_eidolon4, R.drawable.serval_eidolon5, R.drawable.serval_eidolon6};
            case "Silver Wolf" : return new int[]{R.drawable.silver_wolf_icon, R.drawable.silver_wolf_splash, R.drawable.silver_wolf_eidolon1, R.drawable.silver_wolf_eidolon2, R.drawable.silver_wolf_eidolon3, R.drawable.silver_wolf_eidolon4, R.drawable.silver_wolf_eidolon5, R.drawable.silver_wolf_eidolon6};
            case "Sushang" : return new int[]{R.drawable.sushang_icon, R.drawable.sushang_splash, R.drawable.sushang_eidolon1, R.drawable.sushang_eidolon2, R.drawable.sushang_eidolon3, R.drawable.sushang_eidolon4, R.drawable.sushang_eidolon5, R.drawable.sushang_eidolon6};
            case "Tingyun" : return new int[]{R.drawable.tingyun_icon, R.drawable.tingyun_splash, R.drawable.tingyun_eidolon1, R.drawable.tingyun_eidolon2, R.drawable.tingyun_eidolon3, R.drawable.tingyun_eidolon4, R.drawable.tingyun_eidolon5, R.drawable.tingyun_eidolon6};
            case "Welt" : return new int[]{R.drawable.welt_icon, R.drawable.welt_splash, R.drawable.welt_eidolon1, R.drawable.welt_eidolon2, R.drawable.welt_eidolon3, R.drawable.welt_eidolon4, R.drawable.welt_eidolon5, R.drawable.welt_eidolon6};
            case "Yanqing" : return new int[]{R.drawable.yanqing_icon, R.drawable.yanqing_splash, R.drawable.yanqing_eidolon1, R.drawable.yanqing_eidolon2, R.drawable.yanqing_eidolon3, R.drawable.yanqing_eidolon4, R.drawable.yanqing_eidolon5, R.drawable.yanqing_eidolon6};


            default: return new int[]{R.drawable.ico_lost_img, R.drawable.ico_lost_img};
        }
    }

    public int[] getLightconeByName(String lightconeNameInFile){
        switch (lightconeNameInFile){
            case "Amber" : return new int[] {R.drawable.amber, R.drawable.amber_artwork};
            case "Arrows" : return new int[] {R.drawable.arrows, R.drawable.arrows_artwork};
            case "A Secret Vow" : return new int[] {R.drawable.a_secret_vow, R.drawable.a_secret_vow_artwork};
            case "Adversarial" : return new int[] {R.drawable.a_secret_vow, R.drawable.a_secret_vow_artwork};
            case "Before Dawn" : return new int[] {R.drawable.before_dawn, R.drawable.before_dawn_artwork};
            case "But the Battle Isn't Over" : return new int[] {R.drawable.but_the_battle_isnt_over, R.drawable.but_the_battle_isnt_over_artwork};
            case "Carve the Moon, Weave the Clouds" : return new int[] {R.drawable.carve_the_moon_weave_the_clouds, R.drawable.carve_the_moon_weave_the_clouds_artwork};
            case "Chorus" : return new int[] {R.drawable.chorus, R.drawable.chorus_artwork};
            case "Collapsing Sky" : return new int[] {R.drawable.collapsing_sky, R.drawable.collapsing_sky_artwork};
            case "Cornucopia" : return new int[] {R.drawable.cornucopia, R.drawable.cornucopia_artwork};
            case "Cruising in the Stellar Sea" : return new int[] {R.drawable.cruising_in_the_stellar_sea, R.drawable.cruising_in_the_stellar_sea_artwork};
            case "Dance! Dance! Dance!" : return new int[] {R.drawable.dance_dance_dance, R.drawable.dance_dance_dance_artwork};
            case "Darting Arrow" : return new int[] {R.drawable.darting_arrow, R.drawable.darting_arrow_artwork};
            case "Data Bank" : return new int[] {R.drawable.data_bank, R.drawable.data_bank_artwork};
            case "Day One of My New Life" : return new int[] {R.drawable.day_one_of_my_new_life, R.drawable.day_one_of_my_new_life_artwork};
            case "Defense" : return new int[] {R.drawable.defense, R.drawable.defense_artwork};
            case "Eyes of the Prey" : return new int[] {R.drawable.eyes_of_the_prey, R.drawable.eyes_of_the_prey_artwork};
            case "Echoes of the Coffin" : return new int[] {R.drawable.echoes_of_the_coffin, R.drawable.echoes_of_the_coffin_artwork};
            case "Fermata" : return new int[] {R.drawable.fermata, R.drawable.fermata_artwork};
            case "Fine Fruit" : return new int[] {R.drawable.fine_fruit, R.drawable.fine_fruit_artwork};
            case "Geniuses' Repose" : return new int[] {R.drawable.geniuses_repose, R.drawable.geniuses_repose_artwork};
            case "Good Night and Sleep Well" : return new int[] {R.drawable.good_night_and_sleep_well, R.drawable.good_night_and_sleep_well_artwork};
            case "Hidden Shadow" : return new int[] {R.drawable.hidden_shadow, R.drawable.hidden_shadow_artwork};
            case "In the Name of the World" : return new int[] {R.drawable.in_the_name_of_the_world, R.drawable.in_the_name_of_the_world_artwork};
            case "In the Night" : return new int[] {R.drawable.in_the_night, R.drawable.in_the_night_artwork};
            case "Incessant Rain" : return new int[] {R.drawable.incessant_rain, R.drawable.incessant_rain_artwork};
            case "Landau's Choice" : return new int[] {R.drawable.landaus_choice, R.drawable.landaus_choice_artwork};
            case "Loop" : return new int[] {R.drawable.loop, R.drawable.loop_artwork};
            case "Make the World Clamor" : return new int[] {R.drawable.make_the_world_clamor, R.drawable.make_the_world_clamor_artwork};
            case "Mediation" : return new int[] {R.drawable.mediation, R.drawable.mediation_artwork};
            case "Memories of the Past" : return new int[] {R.drawable.memories_of_the_past, R.drawable.memories_of_the_past_artwork};
            case "Meshing Cogs" : return new int[] {R.drawable.meshing_cogs, R.drawable.meshing_cogs_artwork};
            case "Moment of Victory" : return new int[] {R.drawable.moment_of_victory, R.drawable.moment_of_victory_artwork};
            case "Multiplication" : return new int[] {R.drawable.multiplication, R.drawable.multiplication_artwork};
            case "Mutual Demise" : return new int[] {R.drawable.mutual_demise, R.drawable.mutual_demise_artwork};
            case "Night on the Milky Way" : return new int[] {R.drawable.night_on_the_milky_way, R.drawable.night_on_the_milky_way_artwork};
            case "Nowhere to Run" : return new int[] {R.drawable.nowhere_to_run, R.drawable.nowhere_to_run_artwork};
            case "Only Silence Remains" : return new int[] {R.drawable.only_silence_remains, R.drawable.only_silence_remains_artwork};
            case "On the Fall of an Aeon" : return new int[] {R.drawable.on_the_fall_of_an_aeon, R.drawable.on_the_fall_of_an_aeon_artwork};
            case "Passkey" : return new int[] {R.drawable.passkey, R.drawable.passkey_artwork};
            case "Past and Future" : return new int[] {R.drawable.past_and_future, R.drawable.past_and_future_artwork};
            case "Patience Is All You Need" : return new int[] {R.drawable.patience_is_all_you_need, R.drawable.patience_is_all_you_need_artwork};
            case "Perfect Timing" : return new int[] {R.drawable.perfect_timing, R.drawable.perfect_timing_artwork};
            case "Pioneering" : return new int[] {R.drawable.pioneering, R.drawable.pioneering_artwork};
            case "Planetary Rendezvous" : return new int[] {R.drawable.planetary_rendezvous, R.drawable.planetary_rendezvous_artwork};
            case "Post-Op Conversation" : return new int[] {R.drawable.post_op_conversation, R.drawable.post_op_conversation_artwork};
            case "Quid Pro Quo" : return new int[] {R.drawable.quid_pro_quo, R.drawable.quid_pro_quo_artwork};
            case "Resolution Shines As Pearls of Sweat" : return new int[] {R.drawable.resolution_shines_as_pearls_of_sweat, R.drawable.resolution_shines_as_pearls_of_sweat_artwork};
            case "Return to Darkness" : return new int[] {R.drawable.return_to_darkness, R.drawable.return_to_darkness_artwork};
            case "River Flows in Spring" : return new int[] {R.drawable.river_flows_in_spring, R.drawable.river_flows_in_spring_artwork};
            case "Sagacity" : return new int[] {R.drawable.sagacity, R.drawable.sagacity_artwork};
            case "Shared Feeling" : return new int[] {R.drawable.shared_feeling, R.drawable.shared_feeling_artwork};
            case "Shattered Home" : return new int[] {R.drawable.shattered_home, R.drawable.shattered_home_artwork};
            case "Sleep Like the Dead" : return new int[] {R.drawable.sleep_like_the_dead, R.drawable.sleep_like_the_dead_artwork};
            case "Something Irreplaceable" : return new int[] {R.drawable.something_irreplaceable, R.drawable.something_irreplaceable_artwork};
            case "Subscribe for More!" : return new int[] {R.drawable.subscribe_for_more, R.drawable.subscribe_for_more_artwork};
            case "Swordplay" : return new int[] {R.drawable.swordplay, R.drawable.swordplay_artwork};
            case "Texture of Memories" : return new int[] {R.drawable.texture_of_memories, R.drawable.texture_of_memories_artwork};
            case "The Birth of the Self" : return new int[] {R.drawable.the_birth_of_the_self, R.drawable.the_birth_of_the_self_artwork};
            case "The Moles Welcome You" : return new int[] {R.drawable.the_moles_welcome_you, R.drawable.the_moles_welcome_you_artwork};
            case "The Seriousness of Breakfast" : return new int[] {R.drawable.the_seriousness_of_breakfast, R.drawable.the_seriousness_of_breakfast_artwork};
            case "The Unreachable Side" : return new int[] {R.drawable.the_unreachable_side, R.drawable.the_unreachable_side_artwork};
            case "This Is Me!" : return new int[] {R.drawable.this_is_me, R.drawable.this_is_me_artwork};
            case "Time Waits for No One" : return new int[] {R.drawable.time_waits_for_no_one, R.drawable.time_waits_for_no_one_artwork};
            case "Today Is Another Peaceful Day" : return new int[] {R.drawable.today_is_another_peaceful_day, R.drawable.today_is_another_peaceful_day_artwork};
            case "Trend of the Universal Market" : return new int[] {R.drawable.trend_of_the_universal_market, R.drawable.trend_of_the_universal_market_artwork};
            case "Under the Blue Sky" : return new int[] {R.drawable.under_the_blue_sky, R.drawable.under_the_blue_sky_artwork};
            case "Void" : return new int[] {R.drawable.void_, R.drawable.void_artwork};
            case "Warmth Shortens Cold Nights" : return new int[] {R.drawable.warmth_shortens_cold_nights, R.drawable.warmth_shortens_cold_nights_artwork};
            case "We Are Wildfire" : return new int[] {R.drawable.we_are_wildfire, R.drawable.we_are_wildfire_artwork};
            case "We Will Meet Again" : return new int[] {R.drawable.we_will_meet_again, R.drawable.we_will_meet_again_artwork};
            case "Woof! Walk Time!" : return new int[] {R.drawable.woof_walk_time, R.drawable.woof_walk_time_artwork};


            default: return new int[]{R.drawable.ico_lost_img,R.drawable.ico_lost_img};
        }
    }

    public int[] getRelicByName(String relicNameInFile){
        switch (relicNameInFile){
            case "Band of Sizzling Thunder" : return new int[] {R.drawable.band_of_sizzling_thunder_1, R.drawable.band_of_sizzling_thunder_2, R.drawable.band_of_sizzling_thunder_3, R.drawable.band_of_sizzling_thunder_4};
            case "Belobog of the Architects" : return new int[] {R.drawable.belobog_of_the_architects_5, R.drawable.belobog_of_the_architects_6};
            case "Celestial Differentiator" : return new int[] {R.drawable.celestial_differentiator_5, R.drawable.celestial_differentiator_6};
            case "Champion of Streetwise Boxing" : return new int[] {R.drawable.champion_of_streetwise_boxing_1, R.drawable.champion_of_streetwise_boxing_2, R.drawable.champion_of_streetwise_boxing_3, R.drawable.champion_of_streetwise_boxing_4};
            case "Eagle of Twilight Line" : return new int[] {R.drawable.eagle_of_twilight_line_1, R.drawable.eagle_of_twilight_line_2, R.drawable.eagle_of_twilight_line_3, R.drawable.eagle_of_twilight_line_4};
            case "Firesmith of Lava-Forging" : return new int[] {R.drawable.firesmith_of_lava_forging_1, R.drawable.firesmith_of_lava_forging_2, R.drawable.firesmith_of_lava_forging_3, R.drawable.firesmith_of_lava_forging_4};
            case "Fleet of the Ageless" : return new int[] {R.drawable.fleet_of_the_ageless_5, R.drawable.fleet_of_the_ageless_6};
            case "Genius of Brilliant Stars" : return new int[] {R.drawable.genius_of_brilliant_stars_1, R.drawable.genius_of_brilliant_stars_2, R.drawable.genius_of_brilliant_stars_3, R.drawable.genius_of_brilliant_stars_4};
            case "Guard of Wuthering Snow" : return new int[] {R.drawable.guard_of_wuthering_snow_1, R.drawable.guard_of_wuthering_snow_2, R.drawable.guard_of_wuthering_snow_3, R.drawable.guard_of_wuthering_snow_4};
            case "Hunter of Glacial Forest" : return new int[] {R.drawable.hunter_of_glacial_forest_1, R.drawable.hunter_of_glacial_forest_2, R.drawable.hunter_of_glacial_forest_3, R.drawable.hunter_of_glacial_forest_4};
            case "Inert Salsotto" : return new int[] {R.drawable.inert_salsotto_5, R.drawable.inert_salsotto_6};
            case "Knight of Purity Palace" : return new int[] {R.drawable.knight_of_purity_palace_1, R.drawable.knight_of_purity_palace_2, R.drawable.knight_of_purity_palace_3, R.drawable.knight_of_purity_palace_4};
            case "Musketeer of Wild Wheat" : return new int[] {R.drawable.musketeer_of_wild_wheat_1, R.drawable.musketeer_of_wild_wheat_2, R.drawable.musketeer_of_wild_wheat_3, R.drawable.musketeer_of_wild_wheat_4};
            case "Pan-Galactic Commercial Enterprise" : return new int[] {R.drawable.pan_galactic_commercial_enterprise_5, R.drawable.pan_galactic_commercial_enterprise_6};
            case "Passerby of Wandering Cloud" : return new int[] {R.drawable.passerby_of_wandering_cloud_1, R.drawable.passerby_of_wandering_cloud_2, R.drawable.passerby_of_wandering_cloud_3, R.drawable.passerby_of_wandering_cloud_4};
            case "Space Sealing Station" : return new int[] {R.drawable.space_sealing_station_5, R.drawable.space_sealing_station_6};
            case "Sprightly Vonwacq" : return new int[] {R.drawable.sprightly_vonwacq_5, R.drawable.sprightly_vonwacq_6};
            case "Talia: Kingdom of Banditry" : return new int[] {R.drawable.talia_kingdom_of_banditry_5, R.drawable.talia_kingdom_of_banditry_6};
            case "Thief of Shooting Meteor" : return new int[] {R.drawable.thief_of_shooting_meteor_1, R.drawable.thief_of_shooting_meteor_2, R.drawable.thief_of_shooting_meteor_3, R.drawable.thief_of_shooting_meteor_4};
            case "Wastelander of Banditry Desert" : return new int[] {R.drawable.wastelander_of_banditry_desert_1, R.drawable.wastelander_of_banditry_desert_2, R.drawable.wastelander_of_banditry_desert_3, R.drawable.wastelander_of_banditry_desert_4};

            default:return new int[]{R.drawable.ico_lost_img,R.drawable.ico_lost_img,R.drawable.ico_lost_img,R.drawable.ico_lost_img};
        }
    }

    public int[] getCharSkillByName(String charNameInFile){
        switch (charNameInFile){
            case "Arlan" : return new int[]{R.drawable.arlan_skill1, R.drawable.arlan_skill2, R.drawable.arlan_skill3, R.drawable.arlan_skill4, R.drawable.arlan_skill6};
            case "Asta" : return new int[]{R.drawable.asta_skill1, R.drawable.asta_skill2, R.drawable.asta_skill3, R.drawable.asta_skill4, R.drawable.asta_skill6};
            case "Bailu" : return new int[]{R.drawable.bailu_skill1, R.drawable.bailu_skill2, R.drawable.bailu_skill3, R.drawable.bailu_skill4, R.drawable.bailu_skill6};
            //case "Blade" : return new int[]{R.drawable.blade_skill1, R.drawable.blade_skill2, R.drawable.blade_skill3, R.drawable.blade_skill4, R.drawable.blade_skill6};
            case "Bronya" : return new int[]{R.drawable.bronya_skill1, R.drawable.bronya_skill2, R.drawable.bronya_skill3, R.drawable.bronya_skill4, R.drawable.bronya_skill6};
            case "Clara" : return new int[]{R.drawable.clara_skill1, R.drawable.clara_skill2, R.drawable.clara_skill3, R.drawable.clara_skill4, R.drawable.clara_skill6};
            case "Dan Heng" : return new int[]{R.drawable.dan_heng_skill1, R.drawable.dan_heng_skill2, R.drawable.dan_heng_skill3, R.drawable.dan_heng_skill4, R.drawable.dan_heng_skill6};
            case "Gepard" : return new int[]{R.drawable.gepard_skill1, R.drawable.gepard_skill2, R.drawable.gepard_skill3, R.drawable.gepard_skill4, R.drawable.gepard_skill6};
            case "Herta" : return new int[]{R.drawable.herta_skill1, R.drawable.herta_skill2, R.drawable.herta_skill3, R.drawable.herta_skill4, R.drawable.herta_skill6};
            case "Himeko" : return new int[]{R.drawable.himeko_skill1, R.drawable.himeko_skill2, R.drawable.himeko_skill3, R.drawable.himeko_skill4, R.drawable.himeko_skill6};
            case "Hook" : return new int[]{R.drawable.hook_skill1, R.drawable.hook_skill2, R.drawable.hook_skill3, R.drawable.hook_skill4, R.drawable.hook_skill6};
            case "Jing Yuan" : return new int[]{R.drawable.jing_yuan_skill1, R.drawable.jing_yuan_skill2, R.drawable.jing_yuan_skill3, R.drawable.jing_yuan_skill4, R.drawable.jing_yuan_skill6};
            case "Kafka" : return new int[]{R.drawable.kafka_skill1, R.drawable.kafka_skill2, R.drawable.kafka_skill3, R.drawable.kafka_skill4, R.drawable.kafka_skill6};
            case "Luocha" : return new int[]{R.drawable.luocha_skill1, R.drawable.luocha_skill2, R.drawable.luocha_skill3, R.drawable.luocha_skill4, R.drawable.luocha_skill6};
            case "March 7th" : return new int[]{R.drawable.march_7th_skill1, R.drawable.march_7th_skill2, R.drawable.march_7th_skill3, R.drawable.march_7th_skill4, R.drawable.march_7th_skill6};
            case "Natasha" : return new int[]{R.drawable.natasha_skill1, R.drawable.natasha_skill2, R.drawable.natasha_skill3, R.drawable.natasha_skill4, R.drawable.natasha_skill6};
            case "Pela" : return new int[]{R.drawable.pela_skill1, R.drawable.pela_skill2, R.drawable.pela_skill3, R.drawable.pela_skill4, R.drawable.pela_skill6};
            case "Qingque" : return new int[]{R.drawable.qingque_skill1, R.drawable.qingque_skill2, R.drawable.qingque_skill3, R.drawable.qingque_skill4, R.drawable.qingque_skill6};
            case "Sampo" : return new int[]{R.drawable.sampo_skill1, R.drawable.sampo_skill2, R.drawable.sampo_skill3, R.drawable.sampo_skill4, R.drawable.sampo_skill6};
            case "Seele" : return new int[]{R.drawable.seele_skill1, R.drawable.seele_skill2, R.drawable.seele_skill3, R.drawable.seele_skill4, R.drawable.seele_skill6};
            case "Serval" : return new int[]{R.drawable.serval_skill1, R.drawable.serval_skill2, R.drawable.serval_skill3, R.drawable.serval_skill4, R.drawable.serval_skill6};
            case "Silver Wolf" : return new int[]{R.drawable.silver_wolf_skill1, R.drawable.silver_wolf_skill2, R.drawable.silver_wolf_skill3, R.drawable.silver_wolf_skill4, R.drawable.silver_wolf_skill6};
            case "Sushang" : return new int[]{R.drawable.sushang_skill1, R.drawable.sushang_skill2, R.drawable.sushang_skill3, R.drawable.sushang_skill4, R.drawable.sushang_skill6};
            case "Tingyun" : return new int[]{R.drawable.tingyun_skill1, R.drawable.tingyun_skill2, R.drawable.tingyun_skill3, R.drawable.tingyun_skill4, R.drawable.tingyun_skill6};
            case "Welt" : return new int[]{R.drawable.welt_skill1, R.drawable.welt_skill2, R.drawable.welt_skill3, R.drawable.welt_skill4, R.drawable.welt_skill6};
            case "Yanqing" : return new int[]{R.drawable.yanqing_skill1, R.drawable.yanqing_skill2, R.drawable.yanqing_skill3, R.drawable.yanqing_skill4, R.drawable.yanqing_skill6};


            default: return new int[]{R.drawable.ico_lost_img, R.drawable.ico_lost_img, R.drawable.ico_lost_img, R.drawable.ico_lost_img, R.drawable.ico_lost_img};
        }
    }

    public int getMaterialByID(int materialID){
        switch (materialID){
            case 29328 : return R.drawable.material_credit;
            case 125435 : return R.drawable.material_tracks_of_destiny;
            case 151160 : return R.drawable.material_lightning_crown_of_the_past_shadow;
            case 409960 : return R.drawable.material_travelers_guide;
            case 409961 : return R.drawable.material_adventure_log;
            case 409962 : return R.drawable.material_travel_encounters;
            case 549438 : return R.drawable.material_extinguished_core;
            case 633379 : return R.drawable.material_glimmering_core;
            case 635673 : return R.drawable.material_shattered_blade;
            case 717320 : return R.drawable.material_squirming_core;
            case 836259 : return R.drawable.material_worldbreaker_blade;
            case 920200 : return R.drawable.material_lifeless_blade;
            case 985668 : return R.drawable.material_destroyers_final_road;
            case 549407 : return R.drawable.material_silvermane_badge;
            case 633348 : return R.drawable.material_silvermane_insignia;
            case 635670 : return R.drawable.material_harmonic_tune;
            case 717289 : return R.drawable.material_silvermane_medal;
            case 836256 : return R.drawable.material_stellaris_symphony;
            case 920197 : return R.drawable.material_ancestral_hymn;
            case 983278 : return R.drawable.material_endotherm_chitin;
            case 270195 : return R.drawable.material_guardians_lament;
            case 635671 : return R.drawable.material_seed_of_abundance;
            case 836257 : return R.drawable.material_flower_of_eternity;
            case 920198 : return R.drawable.material_sprout_of_life;
            case 267805 : return R.drawable.material_storm_eye;
            case 549408 : return R.drawable.material_ancient_part;
            case 633349 : return R.drawable.material_ancient_spindle;
            case 717290 : return R.drawable.material_ancient_engine;
            case 866633 : return R.drawable.material_broken_teeth_of_iron_wolf;
            case 635674 : return R.drawable.material_arrow_of_the_beast_hunter;
            case 836260 : return R.drawable.material_arrow_of_the_starchaser;
            case 920201 : return R.drawable.material_arrow_of_the_demon_slayer;
            case 67219 : return R.drawable.material_horn_of_snow;
            case 635668 : return R.drawable.material_endurance_of_bronze;
            case 836254 : return R.drawable.material_safeguard_of_amber;
            case 920195 : return R.drawable.material_oath_of_steel;
            case 635675 : return R.drawable.material_key_of_inspiration;
            case 836261 : return R.drawable.material_key_of_wisdom;
            case 920202 : return R.drawable.material_key_of_knowledge;
            case 151161 : return R.drawable.material_shape_shifters_lightning_staff;
            case 549504 : return R.drawable.material_immortal_scionette;
            case 633445 : return R.drawable.material_immortal_aeroblossom;
            case 717386 : return R.drawable.material_immortal_lumintwig;
            case 549437 : return R.drawable.material_thiefs_instinct;
            case 633378 : return R.drawable.material_usurpers_scheme;
            case 635669 : return R.drawable.material_obsidian_of_dread;
            case 717319 : return R.drawable.material_conquerors_will;
            case 836255 : return R.drawable.material_obsidian_of_obsession;
            case 920196 : return R.drawable.material_obsidian_of_desolation;
            case 468391 : return R.drawable.material_golden_crown_of_the_past_shadow;
            case 549503 : return R.drawable.material_artifexs_module;
            case 633444 : return R.drawable.material_artifexs_cogwheel;
            case 717385 : return R.drawable.material_artifexs_gyreheart;
            case 351746 : return R.drawable.material_void_cast_iron;
            case 67220 : return R.drawable.material_gelid_chitin;

            default: return R.drawable.ico_lost_img;
        }
    }

    public SpannableString[] getRelicStatusByName(String relicNameInFile, Context context, String LANGUAGE){
        String json_base = LoadAssestData(context,"relic_data/relic_pc.json");
        String[] feedback = new String[]{"N/A","N/A"};
        SpannableString[] feedbackSpannableString = new SpannableString[]{new SpannableString("N/A"),new SpannableString("N/A")};
        //Get data from JSON
        try {
            JSONObject object = new JSONObject(json_base);
            if (object.has(relicNameInFile)){
                JSONArray bonuses = object.getJSONObject(relicNameInFile).getJSONArray("bonuses");
                if (bonuses != null){
                    for(int x = 0 ; x < bonuses.length() ; x++){
                        feedback[x] = bonuses.getJSONObject(x).getString("desc");
                        feedbackSpannableString[x] = valuedText(feedback[x],bonuses.getJSONObject(x).getJSONArray("params"), context);
                    }
                    return feedbackSpannableString;
                }else{
                    return new SpannableString[]{new SpannableString("bonuses NULL"),new SpannableString("bonuses NULL")};
                }
            }
            return new SpannableString[]{new SpannableString(object.getJSONObject(relicNameInFile).toString()),new SpannableString("no this name")};
        } catch (JSONException e) {
            feedback = new String[]{"ERROR - JSONExpection",e.getLocalizedMessage()};
            return new SpannableString[]{new SpannableString(feedback[0]),new SpannableString(feedback[1])};
        }
    }

    public int getBgByItemRarity(int rarity){
        switch (rarity){
            case 1 : return R.drawable.bg_rare_1;
            case 2 : return R.drawable.bg_rare_2;
            case 3 : return R.drawable.bg_rare_3;
            case 4 : return R.drawable.bg_rare_4;
            case 5 : return R.drawable.bg_rare_5;
            default: return R.drawable.bg_rare_0;
        }
    }

    public int getIconByElement(String element){
        switch (element){
            case ELEMENT_FIRE: return R.drawable.element_fire;
            case ELEMENT_ICE: return R.drawable.element_ice;
            case ELEMENT_IMAGINARY: return R.drawable.element_imaginary;
            case ELEMENT_LIGHTNING: return R.drawable.element_lightning;
            case ELEMENT_PHYSICAL: return R.drawable.element_physical;
            case ELEMENT_QUANTUM: return R.drawable.element_quantum;
            case ELEMENT_WIND: return R.drawable.element_wind;
            default: return R.drawable.ico_lost_img;
        }
    }

    public int getIconByPath(String path){
        switch (path){
            case PATH_ABSTRUCTION: return R.drawable.path_the_abundance;
            case PATH_DESTRUCTION: return R.drawable.path_the_destruction;
            case PATH_ERUDITION: return R.drawable.path_the_erudition;
            case PATH_HARMONY: return R.drawable.path_the_harmony;
            case PATH_HUNT: return R.drawable.path_the_hunt;
            case PATH_NIHILITY: return R.drawable.path_the_nihility;
            case PATH_PRESERVATION: return R.drawable.path_the_preservation;
            default: return R.drawable.ico_lost_img;
        }
    }
    public int getNameByElement(String element){
        switch (element){
            case ELEMENT_FIRE: return R.string.element_fire;
            case ELEMENT_ICE: return R.string.element_ice;
            case ELEMENT_IMAGINARY: return R.string.element_imaginary;
            case ELEMENT_LIGHTNING: return R.string.element_lightning;
            case ELEMENT_PHYSICAL: return R.string.element_physical;
            case ELEMENT_QUANTUM: return R.string.element_quantum;
            case ELEMENT_WIND: return R.string.element_wind;
            default: return R.string.n_a;
        }
    }

    public int getNameByPath(String path){
        switch (path){
            case PATH_ABSTRUCTION: return R.string.path_the_abundance;
            case PATH_DESTRUCTION: return R.string.path_the_destruction;
            case PATH_ERUDITION: return R.string.path_the_erudition;
            case PATH_HARMONY: return R.string.path_the_harmony;
            case PATH_HUNT: return R.string.path_the_hunt;
            case PATH_NIHILITY: return R.string.path_the_nihility;
            case PATH_PRESERVATION: return R.string.path_the_preservation;
            default: return R.string.n_a;
        }
    }

    public static SpannableString valuedText(String desc, JSONArray params, Context context) throws JSONException {
        if (params != null){
            // Turn #1[i] to value
            desc = desc.replace("f1]","i]");
            desc = desc.replace("<nobr>","");
            desc = desc.replace("</nobr>","");
            desc = desc.replaceAll("<[^>]*>", "");
            NumberFormat nf = NumberFormat.getNumberInstance();
            nf.setRoundingMode(RoundingMode.HALF_UP);
            nf.setMaximumFractionDigits(2);
            //nf.setMinimumFractionDigits(2); //當value的值是100.00的時候返回100

            ArrayList<Boolean> isPercent = new ArrayList<Boolean>();
            for (int x = 0 ; x < params.length() ; x++){
                String keyword = "#"+String.valueOf(x+1)+"[i]";
                if (desc.contains(keyword+"%")){
                    desc = desc.replace(keyword, nf.format(params.getDouble(x) * 100));
                    isPercent.add(true);
                }else{
                    desc = desc.replace(keyword,nf.format(params.getDouble(x)));
                    isPercent.add(false);
                }
            }

            SpannableString mSpannavleString = (prettyText(desc, context) == null ? new SpannableString(desc) : prettyText(desc, context));

            //Highlight keyword (Value)
            for (int x = 0 ; x < params.length() ; x++){
                String keyword = (isPercent.get(x) ? (nf.format(params.getDouble(x)*100))+"%" : nf.format(params.getDouble(x)));
                String keyword_spec = (isPercent.get(x) ? (" "+nf.format(params.getDouble(x)*100))+"% " : " "+nf.format(params.getDouble(x))+" ");
                for (int i = -1; (i = desc.indexOf(keyword, i + 1)) != -1; i++) {
                    mSpannavleString.setSpan(new ForegroundColorSpan(
                                    context.getResources().getColor(R.color.highlight_color)),
                            desc.indexOf(keyword),
                            desc.indexOf(keyword)+keyword.length(),
                            Spanned.SPAN_EXCLUSIVE_EXCLUSIVE
                    );
                }
                for (int i = -1; (i = desc.indexOf(keyword_spec, i + 1)) != -1; i++) {
                    mSpannavleString.setSpan(new ForegroundColorSpan(
                                    context.getResources().getColor(R.color.highlight_color)),
                            desc.indexOf(keyword_spec),
                            desc.indexOf(keyword_spec)+keyword_spec.length(),
                            Spanned.SPAN_EXCLUSIVE_EXCLUSIVE
                    );
                }
            }

            return mSpannavleString;
        }
        return new SpannableString(desc);
    }
    public static SpannableString prettyText(String str, Context context) {
        SpannableString mSpannavleString = new SpannableString(str);
        String[] keywords = {
                context.getString(R.string.element_fire),
                context.getString(R.string.element_ice),
                context.getString(R.string.element_imaginary),
                context.getString(R.string.element_lightning),
                context.getString(R.string.element_physical),
                context.getString(R.string.element_quantum),
                context.getString(R.string.element_wind)
        };

        int[] keywordsColor = {
                R.color.fire,
                R.color.ice,
                R.color.imaginary,
                R.color.lightning,
                R.color.physical,
                R.color.quantum,
                R.color.wind
        };
        for (int x = 0 ; x < keywords.length ; x++){
            for (int i = -1; (i = str.indexOf(keywords[x], i + 1)) != -1; i++) {
                mSpannavleString.setSpan(new ForegroundColorSpan(context.getResources().getColor(keywordsColor[x])),str.indexOf(keywords[x]),str.indexOf(keywords[x])+keywords[x].length(), Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
            }
        }
        return mSpannavleString;
    }
}