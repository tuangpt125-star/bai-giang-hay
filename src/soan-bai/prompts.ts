export interface LessonPrompt {
  question: string;
  activity: string;
  takeaway: string;
  visual: string;
}

export const prompts: Record<string, LessonPrompt> = {
  '7-8': {
    question: 'Hai bạn đi quãng đường khác nhau trong thời gian khác nhau. Làm sao biết ai đi nhanh hơn?',
    activity: 'Ghi quãng đường và thời gian của mỗi bạn. Tính hai tốc độ theo cùng đơn vị rồi so sánh.',
    takeaway: 'Tốc độ bằng quãng đường chia cho thời gian. Đổi về cùng đơn vị trước khi so sánh.',
    visual: 'Bảng hai người đi, có các cột quãng đường, thời gian và tốc độ.',
  },
  '7-9': {
    question: 'Ta cần đo những đại lượng nào để biết tốc độ của xe đồ chơi giữa hai vạch?',
    activity: 'Đánh dấu hai vạch, đo cự li, bấm thời gian xe qua hai vạch. Lặp lại và so sánh với cách dùng cổng quang.',
    takeaway: 'Lấy cự li giữa hai mốc chia cho thời gian đi giữa hai mốc để tính tốc độ trung bình trên đoạn đó.',
    visual: 'Ảnh hoặc sơ đồ hai vạch đo, có mũi tên chỉ chiều xe chạy.',
  },
  '7-10': {
    question: 'Đoạn đồ thị sẽ có hình dạng gì khi xe dừng?',
    activity: 'Ghi quãng đường ở giây 0, 4, 7 và 10 trong mô phỏng. Dựng đồ thị rồi dùng từng đoạn để kể lại hành trình.',
    takeaway: 'Đoạn nằm ngang cho biết quãng đường giữ nguyên. Độ dốc của đoạn thẳng cho biết tốc độ trên đoạn đó.',
    visual: 'Đồ thị có tên trục, đơn vị và đoạn xe dừng được đánh dấu.',
  },
  '7-11': {
    question: 'Vì sao chạy nhanh hơn làm giảm thời gian xử lí khi cùng nhìn thấy một chướng ngại?',
    activity: 'Tìm một hình biển báo hoặc sơ đồ giao thông. So hai xe có cùng thời gian phản ứng và thảo luận quãng đường còn đi trước khi dừng.',
    takeaway: 'Quãng đường dừng gồm quãng đường phản ứng và quãng đường phanh. Tốc độ và mặt đường ảnh hưởng đến khoảng dừng.',
    visual: 'Hai dải có màu riêng cho đoạn phản ứng và đoạn phanh.',
  },
  '7-12': {
    question: 'Khi thước rung phát tiếng, phần nào chuyển động và âm truyền đến tai bằng cách nào?',
    activity: 'Búng thước nhựa rồi dùng lò xo mềm để theo dõi vùng nén. Chỉ rõ phần tử dao động và hướng lan của vùng nén.',
    takeaway: 'Nguồn âm dao động. Sóng âm truyền qua chất rắn, lỏng hoặc khí và cần môi trường vật chất.',
    visual: 'Hình lò xo đánh dấu một vòng và mũi tên chỉ hướng vùng nén lan đi.',
  },
  '7-13': {
    question: 'Gảy mạnh hơn có nhất thiết làm nốt nhạc cao hơn không?',
    activity: 'So sánh các đồ thị sóng dùng cùng thang đo. Đo biên độ từ đường giữa và đếm số chu kì trong cùng khoảng thời gian.',
    takeaway: 'Biên độ liên quan đến độ to. Tần số cho biết số dao động mỗi giây và liên quan đến độ cao.',
    visual: 'Hai dạng sóng, có đường cân bằng, biên độ và độ dài một chu kì.',
  },
  '7-14': {
    question: 'Tại sao cùng một tiếng vỗ tay nghe khác nhau giữa phòng trống và phòng có rèm?',
    activity: 'So âm thu được khi lần lượt dùng hai bề mặt trong cùng bố trí. Đề xuất một cách xử lí tiếng ồn của lớp.',
    takeaway: 'Âm có thể phản xạ. Vật liệu và cách bố trí ảnh hưởng đến âm dội về và mức âm ở chỗ nghe.',
    visual: 'Sơ đồ nguồn, bề mặt phản xạ và đường âm đến tai.',
  },
  '7-15': {
    question: 'Khi bật thêm một nguồn sáng lệch bên cạnh, bóng trên màn đổi thế nào?',
    activity: 'Vẽ tia đi sát mép vật chắn từ mỗi nguồn. Dùng hình để dự đoán phần màn nhận ánh sáng từ một hoặc cả hai nguồn.',
    takeaway: 'Vùng tối hoàn toàn không nhận ánh sáng trực tiếp từ nguồn. Vùng nửa tối chỉ nhận ánh sáng từ một phần nguồn.',
    visual: 'Hình nguồn sáng, vật chắn, màn và đường biên của vùng bóng.',
  },
  '7-16': {
    question: 'Khi xoay tia tới một góc, tia phản xạ đổi hướng thế nào?',
    activity: 'Dùng hình tương tác để đo ít nhất ba cặp góc. Ghi kết quả trước khi phát biểu quy luật.',
    takeaway: 'Góc tới và góc phản xạ được đo từ pháp tuyến và có độ lớn bằng nhau.',
    visual: 'Hình gương với tia tới, pháp tuyến, tia phản xạ và hai cung góc.',
  },
  '7-17': {
    question: 'Ảnh của vật qua gương phẳng nằm ở đâu và có kích thước thế nào?',
    activity: 'Dự đoán rồi kiểm tra bằng tấm kính phẳng và hai vật giống nhau. Dựng ảnh một điểm bằng hai tia phản xạ.',
    takeaway: 'Ảnh ảo đối xứng với vật qua mặt gương. Đường kéo dài của các tia phản xạ gặp nhau tại ảnh.',
    visual: 'Hình gương, vật, ảnh và đường kéo dài sau gương bằng nét đứt.',
  },
  '7-18': {
    question: 'Những vật nào bị nam châm hút rõ? Làm sao kiểm tra một cực chưa biết?',
    activity: 'Thử mẫu thép, nhôm, đồng và gỗ ở cùng khoảng cách. Sau đó dùng một cực đã biết để kiểm tra hiện tượng đẩy.',
    takeaway: 'Cùng cực thì đẩy, khác cực thì hút. Sự đẩy giữa hai nam châm là dấu hiệu nhận biết cực cùng tên.',
    visual: 'Bảng thử vật liệu và hai cặp nam châm có ghi tên cực.',
  },
  '7-19': {
    question: 'Kim la bàn có chỉ cùng một hướng ở mọi vị trí quanh nam châm không?',
    activity: 'Ghi hướng đầu Bắc của kim tại vài điểm quanh một nam châm rồi vẽ mũi tên tại từng vị trí.',
    takeaway: 'Kim định hướng theo từ trường tại điểm đặt. Bên ngoài thanh nam châm, đường sức hướng từ cực Bắc sang cực Nam.',
    visual: 'Thanh nam châm cùng các mũi tên đo ở bốn vị trí xung quanh.',
  },
  '7-20': {
    question: 'Làm thế nào để một nam châm hút và nhả vật theo lệnh?',
    activity: 'Dùng bộ nam châm điện điện áp thấp của lớp. So hai trạng thái ngắt và cấp dòng, rồi dùng la bàn để quan sát khi đảo chiều dòng.',
    takeaway: 'Dòng điện qua cuộn dây tạo từ trường. Ngắt dòng làm tác dụng hút giảm. Đảo chiều dòng làm đổi cực.',
    visual: 'Sơ đồ pin, công tắc, cuộn dây và lõi sắt với hai trạng thái.',
  },
  '8-13': {
    question: 'Ta cần chọn mẫu thế nào để so sánh khối lượng của sắt và nhôm một cách công bằng?',
    activity: 'Cân ba mẫu sắt khác thể tích, tính m/V. Lặp lại với ba chất cùng thể tích, rồi so các tỉ số.',
    takeaway: 'Với cùng một chất đồng nhất, m/V không đổi trong các mẫu ở cùng điều kiện. D = m/V. Khi đổi đơn vị, 1 g/cm³ = 1 g/mL = 1 000 kg/m³. Trọng lượng riêng d = P/V, đo bằng N/m³.',
    visual: 'Bảng thể tích, khối lượng và tỉ số m/V từ hai thí nghiệm của bài.',
  },
  '8-14': {
    question: 'Làm sao đo thể tích của viên sỏi có hình dạng bất kì?',
    activity: 'Chia nhóm đo khối gỗ, nước và sỏi. Ghi ba lượt cho mỗi mẫu, tính khối lượng và thể tích trung bình rồi tính D.',
    takeaway: 'Thể tích sỏi bằng phần tăng của số chỉ bình chia độ. Dùng cùng hệ đơn vị để tính m/V.',
    visual: 'Bảng ba lượt đo và hình hai vạch nước trước, sau khi nhúng sỏi.',
  },
  '8-15': {
    question: 'Cùng khối hộp, đặt nằm hay đặt đứng làm lớp bột lún sâu hơn?',
    activity: 'Dự đoán ba dấu lún rồi ghi F, S và p. So một khối nằm với hai khối chồng, sau đó so một khối nằm với một khối đứng.',
    takeaway: 'Áp suất p = F/S. Để xác định tác dụng của một yếu tố, giữ yếu tố còn lại như cũ.',
    visual: 'Ba cách đặt khối, có nhãn lực ép, diện tích và độ lún.',
  },
  '8-16': {
    question: 'Hai đầu đo cùng độ sâu trong hai bình nước có hình dạng khác nhau sẽ chỉ thế nào?',
    activity: 'Dùng mô phỏng hai đầu dò. Lần lượt đổi hình dạng bình, độ sâu và loại chất lỏng. Giữ các yếu tố còn lại như cũ rồi so số chỉ.',
    takeaway: 'Trong cùng chất lỏng đứng yên, áp suất ở cùng độ sâu bằng nhau khi áp suất trên mặt thoáng như nhau.',
    visual: 'Hình hai bình với đường ngang đánh dấu cùng độ sâu và một sơ đồ giác mút.',
  },
  '8-17': {
    question: 'Đưa một vật đã chìm hẳn xuống sâu hơn có làm lực đẩy tăng không?',
    activity: 'Ghi số chỉ lực kế và trọng lượng chất lỏng tràn ở 20, 40, 60 và 80 cm³. Lặp lại với nước muối và so hai cột số liệu.',
    takeaway: 'Lực đẩy bằng trọng lượng phần chất lỏng bị chiếm chỗ. Với vật chìm hẳn trong cùng chất lỏng, thể tích đó giữ nguyên.',
    visual: 'Sơ đồ lực kế, bình tràn và bảng so sánh số đo trong nước với nước muối.',
  },
  '8-18': {
    question: 'Vì sao cùng một lực, đẩy cửa gần tay nắm thường dễ quay hơn đẩy gần bản lề?',
    activity: 'Treo cùng một quả nặng ở hai phía và tại trục O. Kéo chốt và mũi tên trong mô phỏng, bấm thử lực rồi ghi chiều quay và moment ban đầu.',
    takeaway: 'Moment bằng độ lớn của lực nhân với cánh tay đòn. Đường tác dụng đi qua trục cho moment bằng 0.',
    visual: 'Sơ đồ trục O, mũi tên F, giá lực nét đứt và đoạn d vuông góc với giá lực.',
  },
  '8-19': {
    question: 'Bạn nhẹ hơn cần ngồi ở đâu để cân bằng bập bênh?',
    activity: 'Giữ tải 18 N. Kéo chốt tay, thử một lực rồi quan sát thanh. Tìm lực cân bằng và so với hai cách bố trí loại 2.',
    takeaway: 'Khi cân bằng, hai moment ngược chiều bằng nhau. Cánh tay đòn của lực tay dài hơn cánh tay đòn của tải thì lợi về lực.',
    visual: 'Ba sơ đồ với điểm tựa O, tải P và lực tay F. Ghi số đo của ba vị trí tay.',
  },
  '8-20': {
    question: 'Tại sao bóng cao su đã cọ có thể hút giấy dù mẩu giấy trung hòa?',
    activity: 'Quan sát trước và sau khi cọ. Tách hiện tượng hút vật trung hòa khỏi phép thử đẩy giữa hai vật nhiễm điện cùng dấu.',
    takeaway: 'Electron có thể chuyển giữa các vật khi cọ xát. Vật trung hòa có thể bị hút do điện tích phân bố lại.',
    visual: 'Hình điện tích trước và sau cọ xát hoặc hình điện nghiệm xòe lá.',
  },
  '8-21': {
    question: 'Vì sao chỉ nối một dây từ pin đến bóng thì bóng không sáng?',
    activity: 'Lắp mạch pin và bóng điện áp thấp. Thay một đoạn dây bằng các mẫu và so kết quả giữ cùng cách lắp.',
    takeaway: 'Dòng điện là dòng chuyển dời có hướng của điện tích. Mạch pin cần đường dẫn kín để duy trì dòng điện qua bóng.',
    visual: 'Hai hình mạch hở và mạch kín, có chỉ ra chỗ thử vật liệu.',
  },
  '8-22': {
    question: 'Dùng kí hiệu nào để vẽ mạch một vòng gồm pin, công tắc và bóng đèn?',
    activity: 'Vẽ sơ đồ rồi lắp trong mô phỏng. Đóng và mở công tắc để kiểm tra sơ đồ với mạch đã lắp.',
    takeaway: 'Mạch kín cho phép dòng điện đi qua bóng. Công tắc đóng hoặc ngắt đường dẫn.',
    visual: 'Sơ đồ có cực pin, công tắc và bóng đèn, kèm chú thích trạng thái.',
  },
  '8-23': {
    question: 'Điện năng chuyển thành gì trong ấm điện, đèn LED và thiết bị mạ?',
    activity: 'Quan sát thí nghiệm điện áp thấp do giáo viên hướng dẫn. Ghi dấu hiệu nóng lên, phát sáng hoặc biến đổi ở điện cực.',
    takeaway: 'Một thiết bị có thể biểu hiện nhiều tác dụng của dòng điện. Dùng dấu hiệu quan sát để xác định tác dụng đang được sử dụng.',
    visual: 'Bảng thiết bị, dấu hiệu quan sát và tác dụng tương ứng.',
  },
  '8-24': {
    question: 'Vì sao ampe kế và vôn kế được mắc theo hai cách khác nhau?',
    activity: 'Đo dòng điện qua đèn và đo hiệu điện thế hai đầu đèn trong cùng mạch. Vẽ vị trí từng dụng cụ.',
    takeaway: 'Ampe kế mắc nối tiếp với nhánh đo. Vôn kế nối song song với hai điểm cần đo.',
    visual: 'Sơ đồ một mạch có chữ A trên vòng và chữ V ở nhánh đo hai đầu bóng.',
  },
  '8-25': {
    question: 'Đổi vị trí ampe kế trong cùng một vòng mạch có đổi số chỉ không?',
    activity: 'Ghi hai lượt đo trước và sau bóng ở mạch ổn định. Ghi riêng số đo dòng điện, hiệu điện thế và sai khác nếu có.',
    takeaway: 'Cường độ ở các vị trí trên cùng mạch một vòng bằng nhau trong trạng thái ổn định.',
    visual: 'Bảng hai lượt đo với tiêu đề cột và đơn vị A, V.',
  },
  '8-26': {
    question: 'Hai cốc nước cùng nhiệt độ nhưng khác lượng nước có nhất thiết cùng nội năng không?',
    activity: 'Vẽ mô hình hạt cho hai cốc. Phân biệt thay đổi xảy ra khi truyền nhiệt với ví dụ làm nóng do thực hiện công.',
    takeaway: 'Nội năng gồm động năng nhiệt và thế năng tương tác giữa các hạt. Nội năng có thể thay đổi do truyền nhiệt hoặc thực hiện công.',
    visual: 'Hai sơ đồ hạt và mũi tên cho chiều truyền năng lượng.',
  },
  '8-27': {
    question: 'Để tăng cùng một số độ, lượng nước lớn hơn cần năng lượng thế nào?',
    activity: 'Ghi joulemeter tại cùng các mốc tăng nhiệt độ cho hai lượng nước. So hai cột và nêu khả năng thất thoát.',
    takeaway: 'Với cùng mức tăng nhiệt độ, lượng nước lớn hơn cần nhận nhiều năng lượng hơn. Joulemeter đo điện năng cấp cho dây đốt.',
    visual: 'Bảng hoặc đồ thị với trục tăng nhiệt độ và năng lượng, có đơn vị °C và J.',
  },
  '8-28': {
    question: 'Nhiệt đi từ cốc nóng ra tay, không khí và vật ở xa theo những cách nào?',
    activity: 'So ba tình huống: cán thìa ấm lên, nước ấm đi lên và bề mặt nhận năng lượng từ đèn.',
    takeaway: 'Dẫn nhiệt truyền năng lượng qua vật chất, đối lưu nhờ dòng chất lưu, bức xạ có thể truyền qua chân không.',
    visual: 'Ba hình có mũi tên biểu diễn đường truyền năng lượng.',
  },
  '8-29': {
    question: 'Tại sao cầu có khe co giãn và băng kép lại cong khi được làm nóng?',
    activity: 'So độ nở của hai thanh cùng chiều dài khi tăng cùng số độ. Dùng kết quả để dự đoán phía băng kép cong về.',
    takeaway: 'Các chất có thể nở khác nhau khi nóng lên. Băng kép cong về phía lớp nở ít hơn.',
    visual: 'Hai trạng thái của băng kép, có nhãn hai kim loại và phía nóng lên.',
  },
};
