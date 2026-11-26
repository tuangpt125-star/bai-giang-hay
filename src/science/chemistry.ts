import { lesson } from './lesson';

export const chemistry = {
  '7-2': lesson('Dùng mô hình Rutherford – Bohr để mô tả nguyên tử và đọc số proton, neutron, electron.', [
    ['Nguyên tử có gì bên trong?', 'Hạt nhân rất nhỏ, gồm proton mang điện dương và thường có neutron không mang điện. Electron mang điện âm ở lớp vỏ. Nguyên tử trung hoà có số electron bằng số proton. Hạt nhân hydro phổ biến chỉ có một proton.'],
    ['Đọc lớp electron và khối lượng', 'Trong mô hình Bohr đơn giản, lớp thứ nhất có tối đa 2 electron. Vì khối lượng electron rất nhỏ, khối lượng nguyên tử gần bằng tổng khối lượng các proton và neutron, tính gần đúng theo đơn vị amu. Hình vẽ các lớp dùng để học cách phân bố electron.'],
  ], 'atom', 'Chọn hạt nhân rồi kiểm tra số electron cần để mô hình trung hoà.',
  [['Hydrogen-1','Một proton đi cùng một electron. Hạt nhân này không có neutron.','Hydrogen|Proton|Neutron|Electron',[1,0,1]],
   ['Carbon-12','Hai electron ở lớp trong và bốn electron ở lớp ngoài.','Carbon|Proton|Neutron|Electron',[6,6,6]],
   ['Oxygen-16','Lớp trong có hai electron. Sáu electron còn lại nằm ở lớp ngoài.','Oxygen|Proton|Neutron|Electron',[8,8,8]]],
  'Một nguyên tử trung hoà có 6 proton và 7 neutron. Nó có mấy electron?', 'Có 6 electron. Khối lượng nguyên tử gần bằng 13 amu trong cách tính gần đúng của bài.'),

  '7-3': lesson('Nhóm các nguyên tử theo số proton và đọc đúng kí hiệu nguyên tố.', [
    ['Dấu hiệu nhận biết nguyên tố', 'Mọi nguyên tử của một nguyên tố có cùng số proton. Các nguyên tử có thể khác số neutron mà vẫn thuộc cùng nguyên tố. Vì vậy có thể dùng số proton để nhận ra nguyên tố khi chưa biết tên.'],
    ['Đọc và viết kí hiệu', 'Kí hiệu có một hoặc hai chữ cái. Chữ đầu viết hoa, chữ thứ hai viết thường. C là carbon, Ca là calcium, còn Na là sodium. C và Ca là hai nguyên tố khác nhau.'],
  ], 'atom', 'Đổi thẻ nguyên tử và dự đoán thẻ nào vẫn thuộc nhóm carbon.',
  [['Thẻ 6 proton, 6 neutron','Số proton là 6, nên đây là carbon.','C|Proton|Neutron|Electron',[6,6,6]],
   ['Thẻ 6 proton, 7 neutron','Thêm một neutron vẫn cho nguyên tố carbon.','C|Proton|Neutron|Electron',[6,7,6]],
   ['Thẻ 7 proton, 7 neutron','Đổi số proton thành 7 thì nguyên tố là nitrogen.','N|Proton|Neutron|Electron',[7,7,7]]],
  'Hai thẻ có cùng số neutron nhưng khác số proton có cùng nguyên tố không?', 'Không. Số proton xác định nguyên tố, còn số neutron có thể khác giữa các nguyên tử cùng nguyên tố.'),

  '7-4': lesson('Tìm ô nguyên tố, chu kì và nhóm trong bảng tuần hoàn.', [
    ['Đọc một ô nguyên tố', 'Các nguyên tố được xếp theo số hiệu nguyên tử tăng dần. Số hiệu nguyên tử bằng số proton. Một ô còn cho biết kí hiệu, tên và khối lượng nguyên tử theo cách ghi của bảng đang dùng.'],
    ['Hàng ngang và cột dọc', 'Mỗi hàng ngang là một chu kì. Số thứ tự chu kì ứng với số lớp electron có electron ở nguyên tử trong mô hình đang học. Các nguyên tố cùng một nhóm thường có tính chất gần nhau. Kim loại tập trung ở bên trái và giữa, phi kim chủ yếu ở bên phải.'],
  ], 'flow', 'Đọc từng ô và lần theo đường từ số hiệu đến vị trí trong bảng.',
  [['Ô Na','Sodium ở chu kì 3, nhóm IA, là kim loại.','Na · 11|Chu kì 3|Nhóm IA'],
   ['Ô Mg','Magnesium cùng chu kì với Na, thuộc nhóm IIA.','Mg · 12|Chu kì 3|Nhóm IIA'],
   ['Ô Ne','Neon ở chu kì 2, nhóm VIIIA, thuộc khí hiếm.','Ne · 10|Chu kì 2|Nhóm VIIIA']],
  'Nguyên tử Mg có 3 lớp electron. Em tìm Mg ở hàng nào?', 'Ở chu kì 3. Số hiệu nguyên tử 12 giúp tìm đúng ô magnesium trên hàng đó.'),

  '7-5': lesson('Phân biệt phân tử, đơn chất và hợp chất. Tính khối lượng phân tử từ công thức.', [
    ['Đếm số loại nguyên tố', 'Đơn chất tạo từ một nguyên tố, còn hợp chất tạo từ hai nguyên tố trở lên. Phân tử oxygen O₂ vẫn là đơn chất vì cả hai nguyên tử đều là O. Nước H₂O là hợp chất. Một số chất, chẳng hạn kim loại, có cấu tạo mạng thay vì các phân tử rời.'],
    ['Từ công thức đến khối lượng', 'Chỉ số nhỏ cho biết số nguyên tử của nguyên tố trong phân tử. Dùng gần đúng H = 1 amu, O = 16 amu. Một phân tử nước có hai H và một O nên nặng khoảng 18 amu.'],
  ], 'reaction', 'Chọn mô hình hạt rồi đếm số nguyên tử và số loại nguyên tố trước khi kiểm tra.',
  [['Oxygen','O₂ có hai nguyên tử nhưng chỉ một loại nguyên tố. Khối lượng phân tử khoảng 32 amu.','O₂|O + O'],
   ['Nước','H₂O gồm H và O. Khối lượng phân tử khoảng 18 amu.','H₂O|H + O + H'],
   ['Carbon dioxide','CO₂ gồm C và O. Khối lượng phân tử khoảng 44 amu.','CO₂|O + C + O']],
  'Cl₂ là đơn chất hay hợp chất?', 'Là đơn chất vì chỉ được tạo bởi nguyên tố chlorine, dù một phân tử có hai nguyên tử.'),

  '7-6': lesson('So sánh nhường, nhận electron với dùng chung cặp electron.', [
    ['Liên kết ion', 'Khi một nguyên tử nhường electron, nó tạo ion dương. Nguyên tử nhận electron tạo ion âm. Các ion trái dấu hút nhau. Trong tinh thể sodium chloride, các ion Na⁺ và Cl⁻ sắp xếp thành mạng.'],
    ['Liên kết cộng hoá trị', 'Hai nguyên tử có thể dùng chung một hoặc nhiều cặp electron. Trong H₂, mỗi H góp một electron tạo một cặp dùng chung. Trong nước, O tạo một liên kết cộng hoá trị với mỗi H. Mô hình chỉ vẽ electron tham gia liên kết để dễ theo dõi.'],
  ], 'reaction', 'Đổi cặp nguyên tử rồi quan sát electron được chuyển hay được dùng chung.',
  [['Sodium và chlorine','Na nhường một electron, Cl nhận electron. Hai ion trái dấu hút nhau.','Na + Cl|Na⁺ + Cl⁻'],
   ['Hai nguyên tử hydrogen','Hai H góp mỗi bên một electron để tạo một cặp dùng chung.','H + H|H₂'],
   ['Hai hydrogen và một oxygen','O dùng chung một cặp electron với mỗi H. Một phân tử nước được tạo thành trong mô hình liên kết.','H + O + H|H₂O']],
  'Trong phân tử H₂, nguyên tử nào nhận hẳn electron của nguyên tử còn lại?', 'Cả hai H dùng chung một cặp electron. Đây là liên kết cộng hoá trị.'),

  '7-7': lesson('Đọc công thức hoá học và dùng quy tắc hoá trị để tìm tỉ lệ nguyên tử.', [
    ['Chỉ số trong công thức', 'Chỉ số đặt ngay sau kí hiệu chỉ số nguyên tử. Nếu bằng 1 thì không ghi. Trong Al₂O₃ có hai Al và ba O theo một đơn vị công thức. Khi lập công thức, tìm tỉ lệ nguyên nhỏ nhất phù hợp hoá trị.'],
    ['Làm cân hai tích', 'Với AₓBᵧ theo quy tắc hoá trị đơn giản, x × hoá trị A bằng y × hoá trị B. Al hoá trị III và O hoá trị II cho tỉ lệ 2 : 3. Cần kiểm tra bằng cách tính lại 2 × 3 và 3 × 2.'],
  ], 'reaction', 'Ghép hai nguyên tố theo hoá trị rồi kiểm tra công thức tối giản.',
  [['Magnesium (II) và chlorine (I)','Một Mg cần hai Cl vì 1 × 2 = 2 × 1.','Mg + Cl + Cl|MgCl₂'],
   ['Aluminium (III) và oxygen (II)','Hai Al và ba O cùng cho tích 6.','Al + Al + O + O + O|Al₂O₃'],
   ['Carbon (IV) và oxygen (II)','Một C đi với hai O. Hai tích bằng 4.','C + O + O|CO₂']],
  'Na hoá trị I và O hoá trị II. Công thức đơn giản là gì?', 'Na₂O vì 2 × 1 = 1 × 2.'),

  '8-1': lesson('Đọc nhãn, nhận biết dụng cụ cơ bản và chọn ứng xử phù hợp trong phòng thí nghiệm.', [
    ['Đọc nhãn trước khi nhận vật', 'Xác định tên hoá chất và kí hiệu cảnh báo. Giáo viên hướng dẫn cách dùng và nơi thải bỏ. Giữ nhãn ở đúng chai, không nếm mẫu hoặc tự ý trộn các hoá chất.'],
    ['Chọn dụng cụ theo việc cần làm', 'Ống đong có vạch để đo thể tích. Cốc dùng để chứa, pha hoặc khuấy theo hướng dẫn. Khi lấy ít chất lỏng, dùng dụng cụ nhỏ giọt phù hợp. Đọc mực ở ngang mắt để giảm sai số do góc nhìn.'],
  ], 'flow', 'Chọn tình huống và theo dõi thứ tự xử lí.',
  [['Đo thể tích nước','Chọn ống đong, đặt thẳng trên mặt phẳng và đọc ở ngang mắt.','Chọn ống đong|Đặt thẳng|Đọc ngang mắt'],
   ['Chai mất nhãn','Để nguyên chai và báo giáo viên. Chai mất nhãn chưa được dùng.','Dừng thao tác|Báo giáo viên'],
   ['Làm đổ mẫu chưa rõ chất','Lùi khỏi chỗ đổ và báo giáo viên. Làm theo hướng dẫn của người phụ trách.','Tránh tiếp xúc|Báo giáo viên']],
  'Cần đo thể tích, em chọn cốc hay ống đong có độ chia phù hợp?', 'Chọn ống đong. Vạch chia và vị trí đọc ngang mắt giúp đo thể tích.'),

  '8-2': lesson('Phân biệt biến đổi vật lí và hoá học, nhận ra phản ứng thu nhiệt hoặc toả nhiệt.', [
    ['Bản chất của biến đổi', 'Nước đá tan vẫn là nước nên là biến đổi vật lí. Trong phản ứng hoá học, chất ban đầu được gọi là chất phản ứng, chất mới là sản phẩm. Các nguyên tử được sắp xếp lại khi liên kết thay đổi. Bọt khí hay đổi màu là gợi ý để tìm thêm bằng chứng.'],
    ['Theo dõi năng lượng', 'Phản ứng toả nhiệt truyền năng lượng ra môi trường, phản ứng thu nhiệt nhận năng lượng. Một phản ứng cần mồi ban đầu vẫn có thể toả nhiệt sau khi đã bắt đầu.'],
  ], 'reaction', 'Quan sát hạt trước và sau, rồi xem dữ kiện về chất mới và nhiệt.',
  [['Nước đá tan','Chất vẫn là H₂O, chỉ trạng thái thay đổi.','H₂O rắn|H₂O lỏng'],
   ['Hydrogen phản ứng với oxygen','Nước là chất mới và phản ứng toả nhiệt.','2 H₂ + O₂|2 H₂O'],
   ['Nhiệt phân đá vôi','Calcium carbonate nhận nhiệt, tạo calcium oxide và carbon dioxide.','CaCO₃|CaO + CO₂']],
  'Có bọt khi nước sôi. Chỉ dấu đó đủ để kết luận có phản ứng không?', 'Chưa đủ. Bọt có thể là hơi nước. Phải xét xem có chất mới được tạo thành hay không.'),

  '8-3': lesson('Dùng mol để đếm hạt, liên hệ n với khối lượng, thể tích khí và tỉ khối.', [
    ['Từ số hạt đến khối lượng', 'Một mol chứa khoảng 6,022 × 10²³ hạt. Khối lượng mol M có đơn vị g/mol. Nếu m tính bằng gam thì n = m/M tính bằng mol. Phải chỉ rõ hạt được đếm là nguyên tử, phân tử hay đơn vị công thức.'],
    ['So hai khí trong cùng điều kiện', 'Ở 25 °C và 1 bar, một mol khí lí tưởng chiếm khoảng 24,79 L. Tỉ khối khí A so với B bằng M của A chia M của B. So với không khí có thể dùng giá trị gần đúng 29 g/mol cho không khí.'],
  ], 'bars', 'So cùng 1 mol các khí ở 25 °C và 1 bar. Cột biểu diễn khối lượng theo gam.',
  [['1 mol N₂','Có cùng số phân tử và gần cùng thể tích với 1 mol O₂, nhưng nặng 28 g.','N₂ g|Không khí g',[28,29]],
   ['1 mol O₂','Khối lượng là 32 g. Tỉ khối so với không khí gần 1,10.','O₂ g|Không khí g',[32,29]],
   ['1 mol CO₂','Khối lượng là 44 g. Một mol vẫn chiếm gần 24,79 L ở điều kiện đã nêu.','CO₂ g|Không khí g',[44,29]]],
  '16 g O₂ chiếm khoảng bao nhiêu lít ở 25 °C, 1 bar?', '16 : 32 = 0,5 mol. Thể tích khoảng 0,5 × 24,79 = 12,40 L.'),

  '8-4': lesson('Phân biệt chất tan, dung môi, độ tan, nồng độ phần trăm và nồng độ mol.', [
    ['Quan sát quá trình hoà tan', 'Dung dịch là hỗn hợp đồng nhất của chất tan và dung môi. Ở một nhiệt độ xác định, dung dịch bão hoà không thể hoà tan thêm chất đó. Độ tan cho biết số gam chất tan tối đa trong 100 g nước ở điều kiện đã nêu.'],
    ['Chọn đúng mẫu số', 'C% = m chất tan / m dung dịch × 100%. Nồng độ mol bằng số mol chất tan chia thể tích dung dịch tính bằng lít. Khi thêm nước, lượng chất tan giữ nguyên nếu không có thất thoát.'],
  ], 'bars', 'Thay khối lượng nước hoặc muối, rồi tính nồng độ trước khi xem kết quả. Các cột tính bằng gam.',
  [['10 g muối và 90 g nước','100 g dung dịch chứa 10 g muối, nên C% = 10%.','Muối g|Nước g',[10,90]],
   ['Thêm 100 g nước','Khối lượng dung dịch tăng thành 200 g, muối vẫn 10 g. C% = 5%.','Muối g|Nước g',[10,190]],
   ['20 g muối và 80 g nước','Dung dịch 100 g chứa 20 g muối, nên C% = 20%.','Muối g|Nước g',[20,80]]],
  'Có 0,25 mol chất tan trong 500 mL dung dịch. Nồng độ mol bằng bao nhiêu?', '500 mL = 0,5 L. Nồng độ là 0,25 : 0,5 = 0,5 mol/L.'),

  '8-5': lesson('Giải thích bảo toàn khối lượng và cân bằng phương trình bằng hệ số.', [
    ['Cân cả hệ', 'Trong hệ kín, cân trước và sau phản ứng cho cùng khối lượng vì các nguyên tử vẫn ở trong hệ. Nếu chất khí thoát khỏi dụng cụ cân, số chỉ có thể giảm. Để kiểm tra, cần tính cả khối lượng khí đã rời hệ đang cân.'],
    ['Kiểm đếm từng nguyên tố', 'Viết đúng công thức rồi đặt hệ số trước các chất. Số nguyên tử của mỗi nguyên tố phải bằng nhau ở hai vế. Chỉ số bên trong công thức quyết định chất, vì vậy giữ nguyên chỉ số khi cân bằng.'],
  ], 'reaction', 'Đếm H và O ở hai vế. Đổi hệ số trên thẻ mẫu để kiểm tra.',
  [['H₂ + O₂ → H₂O','Vế trái có hai O, vế phải chỉ có một O. Sơ đồ chưa cân bằng.','H₂ + O₂|H₂O'],
   ['H₂ + O₂ → 2 H₂O','Hai bên có cùng số O nhưng H chưa bằng nhau.','H₂ + O₂|2 H₂O'],
   ['2 H₂ + O₂ → 2 H₂O','Hai bên đều có 4 H và 2 O. Phương trình cân bằng.','2 H₂ + O₂|2 H₂O']],
  'Khi cân bằng, có được sửa H₂O thành H₂O₂ không?', 'Không. H₂O₂ là chất khác. Ta chỉ thay đổi hệ số đứng trước công thức.'),

  '8-6': lesson('Dùng tỉ lệ hệ số để tính lượng chất và hiệu suất phản ứng.', [
    ['Tính theo số mol', 'Cân bằng phương trình trước, rồi đổi dữ kiện về mol. Hệ số cho tỉ lệ số mol của các chất. Tính số mol chất cần tìm, sau đó đổi sang gam hoặc lít ở điều kiện đã cho.'],
    ['Tính hiệu suất', 'Hiệu suất bằng lượng sản phẩm thực tế chia lượng sản phẩm theo lí thuyết rồi nhân 100%. Hai lượng phải cùng đại lượng và đơn vị. Khi đề bài có dư chất này, tính theo lượng chất phản ứng hết.'],
  ], 'bars', 'Xét phản ứng CaCO₃ → CaO + CO₂. So lượng CO₂ lí thuyết và số thu được.',
  [['1 mol CaCO₃, hiệu suất 100%','Tỉ lệ 1 : 1 cho 1 mol CO₂, tương đương 44 g.','Lí thuyết g|Thu được g',[44,44]],
   ['1 mol CaCO₃, hiệu suất 75%','Lượng CO₂ thu được là 44 × 0,75 = 33 g.','Lí thuyết g|Thu được g',[44,33]],
   ['0,5 mol CaCO₃, hiệu suất 100%','Lượng CO₂ lí thuyết là 0,5 mol, tương đương 22 g.','Lí thuyết g|Thu được g',[22,22]]],
  'Lí thuyết thu 20 g, thực tế thu 16 g. Hiệu suất là bao nhiêu?', '16 : 20 × 100% = 80%.'),

  '8-7': lesson('Nhận biết phản ứng nhanh, chậm và vai trò của nhiệt độ, nồng độ, bề mặt tiếp xúc, chất xúc tác.', [
    ['Đo tốc độ bằng một dấu hiệu', 'Có thể đo thời gian để tạo cùng một thể tích khí hoặc so lượng khí tạo ra trong cùng thời gian. Muốn biết tác dụng của một yếu tố, thay riêng yếu tố đó. Chất rắn chia nhỏ có bề mặt tiếp xúc lớn hơn khi lấy cùng khối lượng.'],
    ['Chất xúc tác làm gì?', 'Chất xúc tác làm phản ứng diễn ra nhanh hơn và được phục hồi sau phản ứng. Với điều kiện so sánh thích hợp, tốc độ tăng không có nghĩa tổng lượng sản phẩm nhất thiết tăng khi phản ứng kết thúc.'],
  ], 'bars', 'So thời gian để thu cùng một lượng khí. Các số liệu tính bằng giây và dùng để minh hoạ.',
  [['Mẫu chuẩn và mẫu nghiền','Mẫu có bề mặt tiếp xúc lớn đạt cùng lượng khí nhanh hơn.','Nguyên miếng s|Nghiền nhỏ s',[60,24]],
   ['Giữ mẫu, tăng nhiệt độ','Trong ví dụ này, hỗn hợp ấm đạt cùng lượng khí sớm hơn.','Mát s|Ấm s',[60,33]],
   ['Giữ mẫu, thêm xúc tác','Mẫu có xúc tác đạt mốc sớm hơn. Tổng sản phẩm cuối có thể bằng nhau.','Không xúc tác s|Có xúc tác s',[60,15]]],
  'Muốn khảo sát ảnh hưởng của diện tích tiếp xúc, có nên đồng thời tăng nhiệt độ không?', 'Không. Giữ nhiệt độ và các điều kiện khác để quy sự khác biệt cho diện tích tiếp xúc.'),

  '8-8': lesson('Nhận biết acid bằng chất chỉ thị và giải thích một số tính chất cơ bản.', [
    ['Acid và dấu hiệu nhận biết', 'Trong nước, acid tạo ion H⁺ theo cách viết giản lược của bài học. Dung dịch acid làm quỳ tím chuyển đỏ. Có thể gặp acetic acid trong giấm và citric acid trong quả chua. Trong phòng thí nghiệm chỉ dùng chất chỉ thị để kiểm tra.'],
    ['Tính chất và sử dụng', 'Một số acid phản ứng với một số kim loại tạo muối và hydrogen. Acid còn có thể phản ứng với base. Khả năng phản ứng phụ thuộc cặp chất và điều kiện nên cần quan sát đúng mẫu đã chọn.'],
  ], 'flow', 'Dùng giấy quỳ ảo cho ba mẫu và so màu quan sát được.',
  [['Giấm loãng','Giấy quỳ tím chuyển đỏ.','Quỳ tím|Mẫu acid|Đỏ'],
   ['Nước tinh khiết','Giấy quỳ tím giữ màu trong mô hình.','Quỳ tím|Mẫu trung tính|Tím'],
   ['Dung dịch base','Giấy quỳ tím chuyển xanh.','Quỳ tím|Mẫu base|Xanh']],
  'Một dung dịch làm quỳ tím đỏ. Có thể kết luận đó chắc chắn là hydrochloric acid không?', 'Không. Có thể nhận biết tính acid, nhưng cần thêm dữ kiện để xác định acid cụ thể.'),

  '8-9': lesson('Nhận biết base, đọc thang pH và liên hệ phản ứng trung hoà.', [
    ['Base và kiềm', 'Các base được học thường gồm ion kim loại và nhóm hydroxide. Base tan trong nước gọi là kiềm. Dung dịch kiềm làm quỳ tím hoá xanh. Acid có thể phản ứng với base tạo muối và nước.'],
    ['Đọc thang pH', 'Ở mức học này, pH nhỏ hơn 7 biểu thị môi trường acid, pH bằng 7 là trung tính, pH lớn hơn 7 là base. Phải dùng thang màu phù hợp với giấy chỉ thị hoặc dụng cụ đo.'],
  ], 'bars', 'Chọn một cặp dung dịch và đối chiếu pH trên cùng thang.',
  [['Giấm và nước','Giấm có tính acid, nước tinh khiết được mô hình hoá là trung tính.','Giấm pH|Nước pH',[3,7]],
   ['Nước và xà phòng','Mẫu xà phòng có pH trên 7. Giá trị cụ thể phụ thuộc mẫu.','Nước pH|Xà phòng pH',[7,10]],
   ['Nước chanh và dung dịch kiềm','Mẫu pH 2 có tính acid, mẫu pH 11 có tính base.','Chanh pH|Kiềm pH',[2,11]]],
  'Thứ nào có tính base, mẫu pH 5 hay mẫu pH 9?', 'Mẫu pH 9 có tính base. Mẫu pH 5 nằm dưới 7 nên có tính acid.'),

  '8-10': lesson('Nhận ra oxide và phân biệt các nhóm qua phản ứng điển hình.', [
    ['Oxide là hợp chất hai nguyên tố', 'Một trong hai nguyên tố là oxygen. Ví dụ CaO là calcium oxide, CO₂ là carbon dioxide. H₂SO₄ có ba nguyên tố nên không phải oxide.'],
    ['Phân loại qua tính chất', 'CaO là oxide base, CO₂ là oxide acid. Al₂O₃ có tính lưỡng tính, có thể phản ứng với acid hoặc base thích hợp. CO là ví dụ oxide trung tính trong phân loại ở mức này.'],
  ], 'reaction', 'Chọn oxide và theo dõi một phản ứng minh hoạ bằng công thức.',
  [['CaO gặp nước','Mô hình cho sản phẩm calcium hydroxide.','CaO + H₂O|Ca(OH)₂'],
   ['CO₂ gặp nước','Một phần CO₂ hoà tan tạo carbonic acid trong nước.','CO₂ + H₂O|H₂CO₃'],
   ['Al₂O₃ gặp acid','Với acid phù hợp, oxide lưỡng tính cho muối và nước.','Al₂O₃ + 6 HCl|2 AlCl₃ + 3 H₂O']],
  'Chất nào là oxide, SO₂ hay Na₂SO₄?', 'SO₂ là oxide vì có đúng hai nguyên tố là sulfur và oxygen.'),

  '8-11': lesson('Đọc thành phần, gọi tên muối và nhận biết dấu hiệu của phản ứng tạo muối.', [
    ['Đọc cấu tạo của muối', 'Muối thường gồm ion dương kim loại hoặc ammonium và ion âm gốc acid. Ví dụ Na₂SO₄ là sodium sulfate. Khi tra bảng tính tan, tìm giao điểm của dòng và cột ứng với hai ion.'],
    ['Từ bằng chứng đến sản phẩm', 'Khi trộn hai dung dịch, phản ứng trao đổi có thể tạo chất kết tủa, khí hoặc chất ít phân li như nước. Dựa vào thành phần và điều kiện để dự đoán. Nếu tất cả các ion vẫn hoà tan và không có yếu tố thúc đẩy thì không quan sát được phản ứng trao đổi.'],
  ], 'reaction', 'Chọn cặp dung dịch mô hình và theo dõi dấu hiệu tạo sản phẩm.',
  [['Calcium chloride và sodium carbonate','Calcium carbonate ít tan xuất hiện như chất rắn.','CaCl₂ + Na₂CO₃|CaCO₃↓ + 2 NaCl'],
   ['Hydrochloric acid và sodium hydroxide','Mô hình tạo sodium chloride và nước.','HCl + NaOH|NaCl + H₂O'],
   ['Sodium chloride và potassium nitrate','Các ion trong mô hình vẫn nằm trong dung dịch, không có kết tủa.','NaCl + KNO₃|Các ion vẫn phân tán']],
  'Trong ví dụ đầu, sản phẩm nào tạo cặn trắng?', 'Calcium carbonate, CaCO₃, là muối ít tan tách ra khỏi dung dịch.'),

  '8-12': lesson('Đọc nhãn đạm, lân, kali và liên hệ sử dụng phân bón hợp lí với môi trường.', [
    ['Nhìn theo nhu cầu của cây', 'Phân đạm cung cấp nitrogen, phân lân cung cấp phosphorus và phân kali cung cấp potassium dưới những dạng phù hợp. Phân NPK cung cấp nhiều nhóm dinh dưỡng. Nhãn phổ biến ghi phần trăm N, P₂O₅ quy đổi và K₂O quy đổi.'],
    ['Bón theo điều kiện', 'Nhu cầu khác theo loài, giai đoạn và độ phì của đất. Dùng đúng loại, lượng, thời điểm và cách bón giúp hạn chế phần bị rửa trôi. Dinh dưỡng dư chảy vào ao hồ có thể làm tảo phát triển mạnh.'],
  ], 'bars', 'Đọc nhãn trên ba túi minh hoạ. Các cột ghi phần trăm theo cách ghi N–P₂O₅–K₂O.',
  [['NPK 16–16–8','Hai số đầu giống nhau, số thứ ba thấp hơn.','N %|P₂O₅ %|K₂O %',[16,16,8]],
   ['NPK 12–12–17','Trong cách ghi này nhóm kali quy đổi có tỉ lệ lớn nhất.','N %|P₂O₅ %|K₂O %',[12,12,17]],
   ['NPK 15–15–15','Ba số bằng nhau theo nhãn, không hàm ý ba nguyên tố tinh khiết có cùng khối lượng.','N %|P₂O₅ %|K₂O %',[15,15,15]]],
  'Vì sao bón càng nhiều không phải lúc nào cũng cho cây tốt hơn?', 'Cây có nhu cầu hữu hạn. Bón dư có thể làm hại cây, lãng phí và tăng lượng chất dinh dưỡng rửa trôi.'),
};
