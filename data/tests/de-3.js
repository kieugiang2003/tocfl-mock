// Đề 3 — TOCFL Band B (進階高階級) mock test 3
// Nguồn: Mock 3 (閱讀). Đáp án theo answer key gốc.
// Phần Nghe: chờ file script (ls_mock3_test_BandB_listen.pdf).
window.TOCFL_TESTS = window.TOCFL_TESTS || [];
window.TOCFL_TESTS.push({
  id: "de-3",
  title: "Đề 3",
  band: "B",
  name: "進階高階級模擬試題（三）",
  audioBase: "audio/de-3/",
  imageBase: "images/de-3/",

  /* Phần Nghe sẽ được thêm khi có script */
  listening: null,

  /* ===================== 閱讀 READING ===================== */
  reading: {
    durationMin: 60,
    sections: [
      { title: "第一部分　選詞填空（第 1～18 題）", instr: "在這一部分，每一段短文有幾個空格，每個空格有四個選項，請選出正確的答案完成短文。" },
      { title: "第二部分　閱讀理解（第 19～50 題）", instr: "在這一部分，請閱讀材料或短文，並根據內容回答幾個問題。" }
    ],
    passages: {
      p1: { label: "（一）", cloze: true, text: "昨天我在整理書桌的時候，發現了一本很久沒 [1] 到的書。那本書是幾年 [2] 我父親送給我的。我打開那本書，裡面有一 [3] 卡片，那是父親給我的。卡片裡他 [4] ：「爸爸想送你最特別的十八歲生日禮物，看了好幾家店以後，[5] 你買了這本書。希望這本書能 [6] 你明白一些道理。」看完卡片，我又把書讀了一遍。" },
      p2: { label: "（二）", cloze: true, text: "李明的車子壞了，所以他最近 [7] 開車上班。李明的家 [8] 公司很遠，要是沒有車子的話，是很不 [9] 的。這個星期，李明每天早上得先坐公共汽車，[10] 坐電車，才能到公司。[11] 三、四天，李明覺得可以接受，但是久了他就覺得麻煩，才 [12] 汽車公司借他一台車，讓他能夠開車上、下班，汽車公司也答應了。" },
      p3: { label: "（三）", cloze: true, text: "我家附近有一家書店。這家書店的客人不多，[13] 書很多。書店老闆人很好，對客人總是很 [14] 。去那裡不一定要買書，也 [15] 只是看看書。在那裡看書，[16] 看多久都行，沒有人會來吵你。記得有一次，書店剛開門，我 [17] 進去看書，不知道看了多久，[18] 頭往外一看，才發現天都已經黑了。" },
      r1: { label: "（一）", image: "r1.jpg", text: "臺灣鐵路管理局　火車時刻查詢系統\n台北開車時間 → 台中到達時間\n06:04 → 08:34\n07:55 → 10:20\n08:37 → 11:12\n10:31 → 12:44" },
      r2: { label: "（二）", image: "r2.jpg", text: "☆全新套房，環境佳，採光好，空間大☆\n交通：步行五分鐘可到地鐵站、公車站\n設備：全新家電（冰箱、冷氣）、桌椅、衣櫃、衛浴個人獨享，洗衣機則與其他房客共用\n環境：近傳統市場、夜市、四號公園，食衣住行樣樣便利\n對象：限單身女性\n費用：套房租金8000元/月，免費使用網路、第四台，再加水費100元/月與電費（獨立電表，用多少算多少）。\n歡迎現場看屋，意者請電：0935-535-355　張先生" },
      r3: { label: "（三）", image: "r3.jpg", text: "展覽說明機使用辦法：\n1. 拿到機器後，先輸入機器上的數字（157），再按「開始」按鈕。這時候你就會聽見使用機器的注意事項，按號碼1，就可以開始聽作品介紹。\n2. 播放中，按左右鈕可調整聲音大小。\n3. 要關掉聲音，請按「停止」鈕或按著號碼0不放約2秒。\n請注意以下幾點：\n1. 不要把機器帶出館外。\n2. 機器請盡量掛在脖子上使用。\n3. 請於本館關閉前15分鐘將機器交回。\n4. 請不要將機器交給7歲以下的孩子使用。\n本館開館時間：星期一到星期五8:00-17:00。（國定假日及週休二日休館）" },
      r4: { label: "（四）", image: "r4.jpg", text: "理想工作的條件是什麼？\n獲得成就感 29%\n高薪 23%\n輕鬆愉快 20%\n發揮專業能力 14%\n受尊敬 7%\n兼顧家庭 7%" },
      r5: { label: "（五）", image: "r5.jpg", text: "本報1月23日至1月27日春節期間送報服務變動如下：\n1. 春節期間，每日發行減少為三大張，特價10元，零售讀者可至本報指定的便利商店購買。\n2. 送報人員於春節期間停送報紙。本報訂戶讀者將獲贈10張報紙兌換券，兌換券將以掛號寄至送報地址。讀者可至便利商店使用該券兌換報紙，本報將不補送訂戶讀者春節期間出版之報紙。\n華人時報" },
      r6: { label: "（六）", text: "根據一項芬蘭的研究發現，還在母親肚中的嬰兒，其實聽得見外界的聲音，而且會開始學習記憶。芬蘭一所大學讓三十三位懷孕母親，從懷孕二十九週到嬰兒出生那一天，每天聽一個芬蘭單字，每天重複播放同樣的聲音好幾百遍，等到嬰兒出生後，研究人員利用儀器觀察嬰兒腦部活動，記錄他們聽到聲音的反應，結果發現，嬰兒聽到過去熟悉的聲音時反應特別明顯。\n事實上，一九八八年就已經有類似的研究發現，如果母親懷孕時喜歡看連續劇，孩子出生後也會受到影響，迷上連續劇，或是至少對於劇情中常出現的音樂或歌曲感到熟悉。\n對此，芬蘭研究人員表示：「已經有證據顯示，在母親肚中的嬰兒會學習。而且嬰兒出生後，仍會記得當初聽過的歌曲或是某一部分的詞句。」研究人員也發現，在母親肚中就聽過同一單字的嬰兒，說出單字的能力，比沒聽過的嬰兒更好。\n美國語言專家寇兒表示：「從研究結果來看，人類並不是出生後才開始學習語言，而是在母親肚中時就開始透過聽聲音去學習。對於人腦在發育初期就具備這項能力，我感到相當意外。」" },
      r7: { label: "（七）", text: "我們都知道，小時候大人說給我們聽的故事，大部分都不是真的。即使早就知道這個事實，但長大以後，當我們有了自己的小孩，還是會把聽過的故事重新說一遍，就這樣一代一代，讓故事繼續下去。這種對幻想世界的好奇心，是每個小孩最珍貴的精神財富。而一個大人在經歷無數人生中的現實之後，如果還能保留住這份天真，該是多麼難得。\n電影《大魚》，正是在探討這樣的主題。電影描述一位非常有想像力的父親，總是告訴小兒子一些以自己為主角的神奇故事，然而隨著年齡增長，小兒子從原本對父親的敬愛和崇拜，逐漸轉變成忽視。他不喜歡父親仍然把他當小孩一樣，繼續說著那些聽起來很「誇張」的故事。父子間的關係因此越來越差，彼此甚至不再說話。直到父親去世後，在父親的葬禮上，小兒子看見父親故事裡的那些人物竟然都出席了，他才明白，父親只是希望，他始終能擁有兒時的天真。最後，他也把父親的故事，分享給了自己的孩子。" },
      r8: { label: "（八）", image: "r8.jpg", text: "健康問與答\n台北陳先生－問：聽說睡眠不足會導致眼睛不適，但是我每天都睡滿八小時，為何眼睛還是紅紅的、有很多血絲？\n任醫師－答：\n眼睛出現血絲大多受以下幾種情況影響所致：\n1. 眼睛過敏。\n2. 配戴隱形眼鏡時間過長。\n3. 長期處於二手菸環境中。\n建議如下：\n1. 若是過敏引發眼睛出現血絲，應避免接觸過敏原。\n2. 隱形眼鏡每次配戴時間不應超過八小時。\n補充說明：\n1. 年齡逾50歲的民眾，也有可能因眼皮鬆弛，導致淚水分泌減少，造成眼睛乾澀而出現血絲。\n2. 眼睛出現血絲時，先冷敷，可暫時緩解不適情況。將濕毛巾輕敷在眼睛上，每次時間約3至5分鐘，休息一下再敷，反覆2至3次。建議您，眼睛若出現血絲超過一週，易併發視力模糊、發炎等症狀，應盡速就醫檢查，若延誤治療則可能有失明風險。" },
      r9: { label: "（九）", text: "有時在外面用餐，總是想念著七零年代那時流行的美式早餐。餐廳裡的裝飾普通，餐桌很大，椅子兩兩相對。只要客人坐下來，服務人員就先給你一杯味道淡得像水一樣的美式熱咖啡，然後二話不說，不論你點什麼，先送上一些烤吐司和炒蛋；然後開始登場的是主要食物──煎香腸，培根或火腿，旁邊放著一大堆像座小山一樣的馬鈴薯，還附上蜂蜜、果醬、奶油等一堆配料。\n那樣的早餐其實大多是吃不完的，至於好不好吃倒也沒那麼重要，但那種熱騰騰的氣氛，讓人一整天都覺得特別幸福。\n後來，義大利式連鎖店漸漸地代替美式早餐店，在每個城市流行起來。早餐一杯義式咖啡加上一份麵包，吃一個算一個的錢，加上漂亮的裝潢與浪漫的音樂，在某一方面是精緻、好看多了，也環保得多，但那份充滿熱情的文化卻也逐漸消失中。" },
      r10: { label: "（十）", text: "「未來郵件」係一項提供寄件人「寫信給未來」的服務，顧客只要事先指定好寄送日期及收件地點，郵件即可於約定時間內送達收件人。\n1. 指定交寄期限：自交寄日起算15日後，最長不可逾30年。\n2. 適用郵件種類：一般掛號函件、掛號小包、國內包裹。\n3. 收寄限制：\n3.1 寄達地限國內地區。\n3.2 現金、寶石等貴重物品，應按報值郵件（註1）交寄（註2）。\n3.3 交寄物品如為危險物品，或為易腐壞、無法常溫保存者，恕均不予收寄。\n4. 資費：含現行郵資及特別處理、保管費用。\n5. 注意事項：\n5.1 交寄申請完成後，本公司將統一以電子郵件通知，若交寄時未註明電子信箱或表明不需通知者，日後將不得異議。\n5.2 郵件資料需異動者，同一訂單以兩次異動為限。\n6. 備註：\n註1：報值郵件即是指掛號信函或包裹經寄件人報明價值，並加付報值費於國內互寄者。\n註2：交寄信函分為裝寄法定紙幣及不裝寄法定紙幣二種：\n(1) 裝寄法定紙幣，每件報值限額為壹萬元。\n(2) 不裝寄法定紙幣，每件限額為伍萬元。\n(3) 法定紙幣與非法定紙幣混合裝寄者，每件限額為伍萬元，但其中法定紙幣以壹萬元為限。" },
      r11: { label: "（十一）", text: "描寫緬甸女英雄翁山蘇姬的電影在台灣上映後，幾乎場場滿座。之所以會有這麼多人進電影院看這部傳記型電影，我認為有兩個原因，一是翁山蘇姬為1991年諾貝爾和平獎得主，是一位英勇、了不起的女性，而且她現在仍然在為她的國家與人民奮鬥，不以抗爭為手段地努力爭取和平；二，華人演員楊紫瓊入木三分的演技，也吸引著觀眾想看她如何詮釋這個真實故事。\n多年前，楊紫瓊主動向該片的法國導演盧貝松要求飾演主角翁山蘇姬，更令人驚訝的是，她竟然花了長達四年的時間做了相關的準備。原本就清瘦的楊紫瓊，為了把翁山蘇姬演得更像，竟然在短時間內減了十公斤；此外，楊紫瓊也學習以緬甸語講台詞，像是電影中有一幕四分鐘的演講，她就花了半年多背誦、練習。除了外型和語言的努力，楊紫瓊在拍片期間還克服了緬甸軍政府的阻礙，與翁山蘇姬本人見上一面，為這部片增添了不少可看性。" },
      r12: { label: "（十二）", text: "300多年前，歐洲到處都出現小麥產量過少的狀況，當時，馬鈴薯剛從美洲傳入歐洲，有位國王一接觸到馬鈴薯，就認為這神奇的作物正是國家的救星，不但種起來容易，蟲又少，吃了也容易讓人有飽足的感覺，相當適合代替麵包成為主要食物，因此下令推廣全國。他在公告裡寫著：「馬鈴薯是個容易種、而且營養豐富的食物，希望大家多種、多吃，這樣一來就能解決麵粉不夠的問題了。」\n沒想到公告以後，「市場反應」卻讓國王很意外，幾乎沒有人願意在家種馬鈴薯，大部分的民眾不願改變以麵包作為主食的習慣。國王幾天後又想出新的對策。他又發布了新命令：「馬鈴薯是國王專屬的食物，一般人不可以吃。」還準備了一塊很大的田專門種馬鈴薯，派了幾名軍人在那兒看著。\n命令公告後，很多民眾心裡想，「馬鈴薯有什麼了不起？為什麼只有國王可以吃？」大家都想吃吃看，很多人到國王的田裡偷馬鈴薯回家種，倒是在那兒的軍人都睜一隻眼閉一隻眼地讓民眾偷。幾個月過去了，馬鈴薯就這樣成了這個國家常見的農作物。" }
    },
    questions: [
      { n: 1, sec: 0, passage: "p1", options: ["開", "查", "看", "遇"], answer: "C", explain: "很久沒看到的書 = cuốn sách lâu rồi không thấy. V + 到 (bổ ngữ kết quả): 看到、找到. 遇到 dùng cho người/sự việc, không dùng cho sách nằm trên bàn." },
      { n: 2, sec: 0, passage: "p1", options: ["中", "上", "前", "後"], answer: "C", explain: "幾年前 = mấy năm trước. Sách bố tặng trong quá khứ (sinh nhật 18 tuổi) nên dùng 前." },
      { n: 3, sec: 0, passage: "p1", options: ["頁", "張", "份", "片"], answer: "B", explain: "Lượng từ của 卡片 (tấm thiệp) là 張 (vật mỏng, phẳng: 一張紙、一張卡片)." },
      { n: 4, sec: 0, passage: "p1", options: ["寫著", "說過", "讀著", "念過"], answer: "A", explain: "Trên thiệp 「寫著」 = có ghi/viết rằng. V + 著 chỉ trạng thái tồn tại của chữ viết (牆上寫著…)." },
      { n: 5, sec: 0, passage: "p1", options: ["對", "要", "給", "向"], answer: "C", explain: "給 + người + V = làm gì cho ai: 給你買了這本書 = mua cho con cuốn sách này." },
      { n: 6, sec: 0, passage: "p1", options: ["讓", "把", "被", "為"], answer: "A", explain: "讓 + người + V = khiến/giúp ai …: 讓你明白一些道理." },
      { n: 7, sec: 0, passage: "p2", options: ["最好", "不能", "還是", "沒空"], answer: "B", explain: "Xe hỏng → 不能開車上班 (không thể lái xe đi làm). Các câu sau nói anh phải đi xe buýt, tàu điện." },
      { n: 8, sec: 0, passage: "p2", options: ["從", "比", "離", "往"], answer: "C", explain: "A 離 B 很遠 = A cách B rất xa. Cấu trúc khoảng cách dùng 離." },
      { n: 9, sec: 0, passage: "p2", options: ["滿意", "容易", "放心", "方便"], answer: "D", explain: "Nhà xa, không có xe thì 很不方便 (rất bất tiện)." },
      { n: 10, sec: 0, passage: "p2", options: ["然後", "後來", "以後", "結果"], answer: "A", explain: "先…，然後… = trước tiên …, sau đó …. Trình tự hành động lặp lại hằng ngày dùng 然後; 後來 chỉ dùng cho chuyện đã xảy ra trong quá khứ." },
      { n: 11, sec: 0, passage: "p2", options: ["第", "頭", "先", "早"], answer: "B", explain: "頭三、四天 = ba, bốn ngày đầu. 頭 + số lượng = những … đầu tiên (頭幾天、頭兩年)." },
      { n: 12, sec: 0, passage: "p2", options: ["計畫", "忘記", "安排", "要求"], answer: "D", explain: "要求 + 人 + V = yêu cầu ai làm gì: 要求汽車公司借他一台車. Câu sau 「汽車公司也答應了」 khớp với một lời yêu cầu." },
      { n: 13, sec: 0, passage: "p3", options: ["卻", "又", "但是", "不但"], answer: "C", explain: "Hai vế tương phản: khách không nhiều, NHƯNG sách rất nhiều → 但是. 卻 cũng mang nghĩa tương phản nhưng là phó từ, phải đứng sau chủ ngữ (書卻很多), không đứng trước 書 được. 又 là thêm vào; 不但 cần 而且 đi kèm." },
      { n: 14, sec: 0, passage: "p3", options: ["客氣", "自由", "感謝", "高興"], answer: "A", explain: "對客人很客氣 = lịch sự, nhã nhặn với khách. Cụm 對 + người + 很客氣 rất thường gặp." },
      { n: 15, sec: 0, passage: "p3", options: ["會", "可以", "不必", "不該"], answer: "B", explain: "不一定要買書，也可以只是看看書 = không nhất thiết mua, cũng có thể chỉ xem sách (sự cho phép)." },
      { n: 16, sec: 0, passage: "p3", options: ["要是", "所以", "可能", "不管"], answer: "D", explain: "不管看多久都行 = đọc bao lâu cũng được. 不管 + từ nghi vấn (多久) … 都 …" },
      { n: 17, sec: 0, passage: "p3", options: ["還", "才", "再", "就"], answer: "D", explain: "書店剛開門，我就進去 = tiệm vừa mở là tôi vào ngay. 剛…就… = vừa … đã …. 才 sẽ mang nghĩa 'mới, muộn'." },
      { n: 18, sec: 0, passage: "p3", options: ["抬", "抽", "扔", "提"], answer: "A", explain: "抬頭 = ngẩng đầu. 抬頭往外一看 = ngẩng đầu nhìn ra ngoài." },

      { n: 19, sec: 1, passage: "r1", prompt: "19. 安安要從台北坐火車去台中，他和朋友約十點三十分在台中站見面，他應該坐幾點的火車，才不會太早到或遲到？", options: ["早上六點四分", "早上七點五十五分", "早上八點三十七分", "早上十點三十一分"], answer: "B", explain: "Hẹn 10:30 ở Đài Trung. Chuyến 07:55 đến 10:20 → vừa kịp, không quá sớm. 06:04 đến 08:34 (quá sớm); 08:37 đến 11:12 (muộn)." },
      { n: 20, sec: 1, passage: "r2", prompt: "20. 根據廣告內容，下面哪一個不對？", options: ["要和別人共用浴室", "套房附近交通方便", "房間裡沒有洗衣機", "8000 元不包括水、電費"], answer: "A", explain: "Tìm câu KHÔNG đúng: 「衛浴個人獨享」 = phòng tắm dùng riêng; chỉ máy giặt là dùng chung. Vì vậy A sai." },
      { n: 21, sec: 1, passage: "r2", prompt: "21. 這間套房的房東能接受下面哪個房客？", options: ["陳先生夫婦", "未婚的林小姐", "吳小姐和她的女兒", "李先生和他的女朋友"], answer: "B", explain: "「對象：限單身女性」 = chỉ cho nữ độc thân thuê. Chỉ có cô Lâm chưa kết hôn phù hợp." },
      { n: 22, sec: 1, passage: "r3", prompt: "22. 要怎麼開始使用這部機器？", options: ["先按「開始」", "先按號碼「1」", "先按著「0」兩秒", "先輸入數字「157」"], answer: "D", explain: "Bước 1: 「先輸入機器上的數字，再按『開始』」; số trên máy là 157. Bấm 1 là bước sau; giữ 0 là để tắt tiếng." },
      { n: 23, sec: 1, passage: "r3", prompt: "23. 使用這部機器的時候要注意什麼事？", options: ["最多只能借五天", "別把機器掛在身上", "不能讓幼稚園的孩子用", "假日借用時間到下午五點"], answer: "C", explain: "「請不要將機器交給7歲以下的孩子使用」→ trẻ mẫu giáo không được dùng. Máy nên đeo ở cổ (B sai); ngày nghỉ bảo tàng đóng cửa (D sai)." },
      { n: 24, sec: 1, passage: "r4", prompt: "24. 根據這個調查結果，下面哪一項是錯的？", options: ["賺多少錢是選擇工作時最重要的因素", "重視工作是否讓人心情愉快的人占五分之一", "在工作上是否受到尊敬是最不被重視的條件之一", "認為工作性質最好跟自己的專業有關的人不到五分之一"], answer: "A", explain: "Tìm câu SAI: cao nhất là 獲得成就感 29%, 高薪 chỉ 23% → lương không phải yếu tố quan trọng nhất. B: 輕鬆愉快 20% = 1/5 ✓; C: 受尊敬 7% thấp nhất ✓; D: 專業 14% < 20% ✓." },
      { n: 25, sec: 1, passage: "r4", prompt: "25. 根據這個調查結果，下面哪一項因素被最多年輕人視為理想工作的條件？", options: ["收入是否合理", "自己的能力是否被肯定", "自己所學是否與工作內容有關", "是否可以同時扮演好職員和父母的角色"], answer: "B", explain: "Nhiều nhất là 獲得成就感 (cảm giác thành tựu, 29%) ≈ năng lực của mình được công nhận. A = 高薪, C = 發揮專業能力, D = 兼顧家庭." },
      { n: 26, sec: 1, passage: "r5", prompt: "26. 關於這家報社的報紙，下面哪一個是對的？", options: ["春節期間不出版", "平時售價一份10元", "平時每份數量有三大張", "春節時在指定商店才買得到"], answer: "D", explain: "「零售讀者可至本報指定的便利商店購買」→ Tết chỉ mua được ở cửa hàng chỉ định. Báo vẫn phát hành (A sai); 10 元 và 3 tờ là giá/số lượng dịp Tết, không phải ngày thường (B, C sai)." },
      { n: 27, sec: 1, passage: "r5", prompt: "27. 這家報社在春節期間打算做什麼？", options: ["免費贈送報紙", "暫時停止送報五天", "補送報紙給已經訂報紙的人", "到便利商店買報紙就能得到兌換券"], answer: "B", explain: "「送報人員於春節期間停送報紙」, Tết từ 23 đến 27/1 = 5 ngày. 「本報將不補送」 → không giao bù (C sai); phiếu đổi gửi cho người đặt báo, không phải người mua lẻ (D sai)." },
      { n: 28, sec: 1, passage: "r6", prompt: "28. 文章中提到的實驗是怎麼進行的？", options: ["用儀器讓嬰兒說話", "每天讓嬰兒聽同樣的音樂", "讓懷孕的母親每天反覆聽單字", "嬰兒出生後，每天播放一個單字"], answer: "C", explain: "「讓三十三位懷孕母親…每天聽一個芬蘭單字，每天重複播放…好幾百遍」. Máy đo dùng để quan sát não, không phải để bé nói (A sai); nghe trước khi sinh (D sai)." },
      { n: 29, sec: 1, passage: "r6", prompt: "29. 根據文章，下面哪一項是對的？", options: ["越早學習語言，記憶力越好", "母親看連續劇，嬰兒比較聰明", "這項研究結果跟以前的互相矛盾", "語言專家寇兒對研究結果感到驚訝"], answer: "D", explain: "寇兒: 「我感到相當意外」 = rất bất ngờ → 驚訝. Nghiên cứu năm 1988 là 「類似」 (tương tự), không mâu thuẫn (C sai)." },
      { n: 30, sec: 1, passage: "r6", prompt: "30. 這篇短文屬於以下哪一類的研究？", options: ["人類的早期教育", "聽力障礙的症狀", "音樂對人的影響", "懷孕期間的變化"], answer: "A", explain: "Bài nói về việc thai nhi đã học ngôn ngữ từ trong bụng mẹ → giáo dục giai đoạn sớm của con người." },
      { n: 31, sec: 1, passage: "r7", prompt: "31. 這篇短文主要想傳達什麼思想？", options: ["看電影和聽故事都不必太認真", "人們應該完全像小孩一樣活著", "成長過程中要保持單純不容易", "既然長大就應該提早面對現實"], answer: "C", explain: "「一個大人在經歷無數人生中的現實之後，如果還能保留住這份天真，該是多麼難得」→ giữ được sự ngây thơ khi lớn lên là không dễ. 難得 = hiếm có." },
      { n: 32, sec: 1, passage: "r7", prompt: "32. 請問下面哪一段文字最符合第二段中所說的「主題」？", options: ["睡前聽故事", "孝順父母親", "失去的童心", "哲學的智慧"], answer: "C", explain: "「主題」 = 「這樣的主題」 ở đoạn 1: giữ lại sự ngây thơ, trí tò mò của trẻ con. Phim kể người con dần mất đi 「兒時的天真」 → 童心 đã mất." },
      { n: 33, sec: 1, passage: "r7", prompt: "33. 根據短文，為什麼小兒子後來和父親的關係不好？", options: ["他一直都誤會父親", "他覺得父親不關心他", "他父親很少再和他講故事", "他父親是個不切實際的人"], answer: "A", explain: "Con trai luôn hiểu lầm bố: anh cho rằng bố 「把他當小孩一樣」 và kể những chuyện 「誇張」, nên dần xem nhẹ bố. Đến đám tang anh mới 「明白」 bố chỉ muốn anh giữ sự ngây thơ → trước đó anh đã hiểu lầm. D (bố không thực tế) chỉ là suy nghĩ của người con, không phải sự thật bài muốn nói." },
      { n: 34, sec: 1, passage: "r8", prompt: "34. 這則「問與答」主要討論什麼？", options: ["預防近視的正確觀念", "睡眠與視力之間的關係", "減輕眼睛不舒服的方法", "改善眼睛疲勞的小技巧"], answer: "C", explain: "Bác sĩ nêu nguyên nhân mắt có tơ máu và cách xử lý: tránh dị nguyên, giới hạn kính áp tròng, chườm lạnh… → cách giảm khó chịu ở mắt. Ông Trần ngủ đủ 8 tiếng nên bài không bàn về giấc ngủ (B)." },
      { n: 35, sec: 1, passage: "r8", prompt: "35. 針對陳先生的問題來源，任醫師認為下面哪種情況是原因之一？", options: ["視力開始退化", "眼睛的淚水過多", "沒有充足的睡眠", "生活環境中有人抽菸"], answer: "D", explain: "Nguyên nhân 3: 「長期處於二手菸環境中」 = thường xuyên ở nơi có khói thuốc. Người trên 50 tuổi bị 淚水分泌減少 (ít nước mắt), không phải nhiều (B sai)." },
      { n: 36, sec: 1, passage: "r8", prompt: "36. 關於任醫師的建議，下列哪一項正確？", options: ["太晚治療容易傳染他人", "眼睛一有血絲應立刻就醫", "每次冷敷眼睛至少五分鐘", "觀察症狀的變化以一週為原則"], answer: "D", explain: "「眼睛若出現血絲超過一週…應盡速就醫」→ lấy một tuần làm mốc theo dõi. Chườm 3–5 phút, không phải 「至少五分鐘」 (C sai); không cần đi khám ngay (B sai); chậm chữa có thể mù, không phải lây (A sai)." },
      { n: 37, sec: 1, passage: "r9", prompt: "37. 作者覺得美式早餐的特色是什麼？", options: ["量多", "味道佳", "作法精緻", "環境優雅"], answer: "A", explain: "Khoai tây 「像座小山一樣」, 「大多是吃不完的」→ đặc điểm là nhiều. 「至於好不好吃倒也沒那麼重要」 (B sai); trang trí 「普通」 (D sai)." },
      { n: 38, sec: 1, passage: "r9", prompt: "38. 作者認為義大利式連鎖咖啡店的早餐缺少了什麼？", options: ["豐富的配料", "漂亮的裝飾", "熱鬧的感覺", "廣闊的用餐環境"], answer: "C", explain: "Quán kiểu Ý đẹp, tinh tế, nhưng 「那份充滿熱情的文化卻也逐漸消失中」→ thiếu không khí ấm áp, náo nhiệt (熱騰騰的氣氛)." },
      { n: 39, sec: 1, passage: "r9", prompt: "39. 這篇文章的作者主要想說明什麼？", options: ["飲食文化的轉變", "選擇早餐的標準", "現代人的飲食習慣", "早餐店成功的秘訣"], answer: "A", explain: "So sánh bữa sáng kiểu Mỹ những năm 70 với chuỗi cửa hàng kiểu Ý sau này → sự thay đổi của văn hóa ẩm thực." },
      { n: 40, sec: 1, passage: "r10", prompt: "40. 小張買了一枚戒指，希望他的太太能在明年的結婚週年紀念日當天收到，他應該注意什麼事？", options: ["不可將戒指寄到國外", "不可連同其他物品寄送", "戒指的價格不可高於一萬", "一旦決定寄達時間則不可更改"], answer: "A", explain: "「3.1 寄達地限國內地區」 → chỉ gửi trong nước. Giới hạn 1 vạn chỉ áp dụng cho TIỀN MẶT, nhẫn không kèm tiền giới hạn 5 vạn (C sai); thông tin được sửa tối đa 2 lần (D sai)." },
      { n: 41, sec: 1, passage: "r10", prompt: "41. 明美打算透過這項服務在年底送朋友一個特別的禮物，下列哪一項符合郵寄規定？", options: ["當季鮮美的水果", "名貴的進口刀具", "清晨現撈的海產", "湖邊撿到的石頭"], answer: "D", explain: "Mục 3.3: không nhận 「危險物品」 (đồ nguy hiểm) và đồ 「易腐壞、無法常溫保存」 (dễ hỏng, không bảo quản ở nhiệt độ thường được). Trái cây tươi (A), hải sản vừa đánh bắt (C) dễ hỏng; dao (B) là đồ nguy hiểm. Chỉ có đá nhặt bên hồ gửi được." },
      { n: 42, sec: 1, passage: "r10", prompt: "42. 榮恩想在指定時間寄送現金及物品給客戶，下列哪一項正確？", options: ["若兩者併寄，總價值不得高於五千元", "若兩者併寄，現金金額以一萬元為限", "若單寄物件，物品價值須高於一萬元", "若單寄現金，金額須介於一萬至五萬元"], answer: "B", explain: "Chú thích 2(3): gửi chung tiền và đồ, mỗi kiện tối đa 5 vạn 「但其中法定紙幣以壹萬元為限」 → tiền mặt tối đa 1 vạn." },
      { n: 43, sec: 1, passage: "r11", prompt: "43. 作者認為這部電影吸引人的地方是什麼？", options: ["主要演員驚人的演技", "導演盧貝松十分有名氣", "片中的真實人物正率領人民打仗", "故事主角為了維護和平而失去生命"], answer: "A", explain: "Lý do thứ hai: 「楊紫瓊入木三分的演技」 (diễn xuất xuất thần). Bà Aung San Suu Kyi đấu tranh 「不以抗爭為手段」 (không dùng bạo lực) và vẫn còn sống (C, D sai)." },
      { n: 44, sec: 1, passage: "r11", prompt: "44. 關於演員楊紫瓊，下面哪一個是對的？", options: ["她的身材本來有點胖", "她要求參與這部電影", "她本來就會說緬甸話", "導演花四年才找到她"], answer: "B", explain: "「楊紫瓊主動向該片的法國導演盧貝松要求飾演主角」. Bà 「原本就清瘦」 (A sai); phải học tiếng Miến (C sai); 4 năm là thời gian bà chuẩn bị (D sai)." },
      { n: 45, sec: 1, passage: "r11", prompt: "45. 根據本文，在拍電影期間，楊紫瓊做了什麼事？", options: ["當緬甸的軍人", "讓體重快速上升", "和翁山蘇姬見面", "在緬甸發表中文演講"], answer: "C", explain: "「在拍片期間還克服了緬甸軍政府的阻礙，與翁山蘇姬本人見上一面」. Bà giảm 10 kg (B sai); bài diễn văn bằng tiếng Miến trong phim (D sai)." },
      { n: 46, sec: 1, passage: "r11", prompt: "46. 第二段主要在說什麼事？", options: ["楊紫瓊是演員兼任導演", "翁山蘇姬的生平與事蹟", "楊紫瓊爭取飾演翁山蘇姬的原因", "楊紫瓊為演出翁山蘇姬所下的功夫"], answer: "D", explain: "Đoạn 2 kể: chuẩn bị 4 năm, giảm cân, học tiếng Miến, gặp nhân vật thật → công sức bỏ ra để đóng vai. 下功夫 = bỏ công sức." },
      { n: 47, sec: 1, passage: "r12", prompt: "47. 關於國王想推廣馬鈴薯的原因，沒提到下面哪一項？", options: ["能當作主要的食物", "味道和麵包非常搭配", "不必花太多力氣照顧", "希望讓人民少用麵粉"], answer: "B", explain: "Bài nhắc: dễ trồng, ít sâu (C), dễ no, thay bánh mì làm lương thực chính (A), giải quyết thiếu bột mì (D). Không nói khoai tây ăn hợp với bánh mì → B." },
      { n: 48, sec: 1, passage: "r12", prompt: "48. 第二段中的「市場反應」指的是什麼？", options: ["一般人吃不起馬鈴薯", "沒有人願意賣馬鈴薯", "農民認為馬鈴薯不容易種", "人民認為馬鈴薯無法取代麵包"], answer: "D", explain: "「大部分的民眾不願改變以麵包作為主食的習慣」→ người dân không chấp nhận khoai tây thay bánh mì." },
      { n: 49, sec: 1, passage: "r12", prompt: "49. 國王能推廣成功，主要是對人民使用了哪種策略？", options: ["強調吃馬鈴薯的好處", "強迫他們不得不接受命令", "引起人民對馬鈴薯的好奇心", "強調小麥不足如何影響生活"], answer: "C", explain: "Vua cấm dân ăn, khiến dân nghĩ 「馬鈴薯有什麼了不起？…大家都想吃吃看」→ khơi gợi trí tò mò. Lính 「睜一隻眼閉一隻眼」 (làm ngơ) để dân trộm." },
      { n: 50, sec: 1, passage: "r12", prompt: "50. 這個故事主要在說明什麼？", options: ["馬鈴薯開始流行的原因", "人民改變飲食習慣的目的", "馬鈴薯對歐洲人民有什麼好處", "國王對食物的愛好如何影響人民"], answer: "A", explain: "Câu chuyện giải thích vì sao khoai tây trở thành cây trồng phổ biến (「就這樣成了這個國家常見的農作物」)." }
    ]
  }
});
