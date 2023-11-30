/*
 * Project Honkai Stargazer (崩壞•星穹觀星者) was
 * Created & Develop by Voc-夜芷冰 , Programmer of Xectorda
 * Copyright © 2023 Xectorda 版權所有
 */

package com.voc.honkai_stargazer.museum;

public class MuseumLibHard {
    //振興值 最高等級
    public static final int expMaxLvl = 50;
    //展區 最高等級
    public static final int areaMaxLvl = 50;
    //遊覽導引,推廣素材,遊客宣傳 最高等級
    public static final int itemMaxLvl = 60;
    //遊覽時間,推廣價值,吸引人流 最高值
    public static final int itemValueMax = 5000;

    //振興值等級 基礎值
    public static final long[] expMaxList = new long[]{
            5000L, 10050L, 15276L, 20826L, 26762L, 33185L, 40209L, 47963L, 56597L, 66139L,
            77218L, 90222L, 105635L, 124060L, 146258L, 173194L, 206100L, 246563L, 296629L, 358960L,
            437034L, 535418L, 660146L, 819227L, 1023351L, 1286864L, 1629120L, 2076374L, 2664433L, 3442402L,
            4477991L, 5865085L, 7734581L, 10270000L, 13730084L, 18481673L, 25047801L, 34178401L, 46954827L, 64945148L,
            90436119L, 126781512L, 178927956L, 254212934L, 363582271L, 523457475L, 758615056L, 1106649888L, 1624930919L, 2401498671L
    };


    //遊覽導引,推廣素材,遊客宣傳 基礎值
    public static final long[] priceItem = new long[]{
            200L,410L,631L,862L,1105L,1591L,2102L,2638L,3201L,3792L,
            4974L,6215L,7518L,8886L,10323L,13196L,16213L,19381L,22707L,26200L,
            33185L,40520L,48221L,56307L,64798L,81779L,99609L,118331L,137988L,158629L,
            199910L,243256L,288768L,336556L,386734L,487089L,592462L,703104L,819278L,941260L,
            1185225L,1441389L,1710360L,1992780L,2289321L,2882403L,3505139L,4159012L,4845579L,5566473L,
            7008263L,8522142L,10111715L,11780767L,13533272L,17038280L,20718540L,24582812L,28640297L,32900657L
    };

    //展區升級 基礎值
    public static final long[] priceArea = new long[]{
            500L,605L,715L,831L,953L,1317L,1700L,2102L,2524L,2967L,
            4297L,5693L,7159L,8699L,10315L,15164L,20255L,25601L,31214L,37108L,
            54789L,73354L,92848L,113316L,134808L,199283L,266982L,338066L,412704L,491074L,
            726184L,973049L,1232257L,1504426L,1790204L,2647536L,3547735L,4492944L,5485413L,6527506L,
            9653784L,12936376L,16383097L,20002155L,23802166L,35202197L,47172231L,59740766L,72937727L,86794537L,
            128364966L,172013917L,217845315L,265968284L,316497400L,468084751L,627251468L,794376522L,969857828L,1154113199L
    };

    //展區各項物件升級 等級
    public static final double[] areaPriceBegin = new double[]{
            1,5,10,15,20,25,30,35,40,45
    };

    //展區升級附帶 各項物件加成
    public static final long[] plusValueFromArea = new long[]{
            20L,20L,20L,20L,20L,30L,30L,30L,30L,30L,
            45L,45L,45L,45L,45L,68L,68L,68L,68L,68L,
            101L,101L,101L,101L,101L,152L,152L,152L,152L,152L,
            228L,228L,228L,228L,228L,342L,342L,342L,342L,342L,
            513L,513L,513L,513L,513L,769L,769L,769L,769L,769L,
            1153L,1153L,1153L,1153L,1153L,1730L,1730L,1730L,1730L,1730L
    };


}