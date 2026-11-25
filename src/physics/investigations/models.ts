export type Inputs = Record<string, number>;
export type Result = { note: string; measures: [string, string][] };
export const format = (n: number, unit = '', digits = 2) =>
  [n.toLocaleString('vi-VN', { maximumFractionDigits: digits }), unit].filter(Boolean).join(' ');

export const hookArms = { A: -20, B: -10, O: 0, C: 20 };
export const weightMoment = (v: Inputs) =>
  Object.entries(hookArms).reduce((sum, [point, arm]) => sum + v[point] * arm * 2 / 100, 0);
export const scaleForce = (arm: number) => 360 / arm;
export const carSettings = (v: Inputs) => {
  const velocity = (30 + v.speed * 15) / 3.6;
  const deceleration = v.surface ? 3.5 : 6;
  return { reaction: velocity, braking: velocity ** 2 / (2 * deceleration) };
};
export const isClosed = (model: string, v: Inputs) => {
  if (model === 'conductors') return Boolean(v.closed && v.sample < 2);
  if (model === 'circuit') return Boolean(v.closed && v.wire);
  if (model === 'meters') return v.meter === 0;
  if (model === 'meterlab') return true;
  return Boolean(v.closed);
};
export const fieldAngles = [0, 180, 0, -64];
export const expansion = (v: Inputs) => v.sample === 0 ? .0012 * (v.temp - 20)
  : v.sample === 1 ? .21 * (v.temp - 20) : 100 * (v.temp - 20) / 293.15;
export const jouleTime = (v: Inputs) => 15 * v.seconds;
export const temperatureRise = (v: Inputs) => jouleTime(v) / (4.18 * v.mass);

function result(note: string, ...measures: [string, string][]): Result { return { note, measures }; }

export function observe(model: string, v: Inputs): Result {
  switch (model) {
    case 'speed': {
      const a = v.distance / v.speed;
      const b = v.distance / v.other;
      return result(a === b ? 'Hai xe đến đích cùng lúc.' : a < b ? 'Xe xanh tới đích trước.' : 'Xe cam tới đích trước.',
        ['Xe xanh', format(a, 's')], ['Xe cam', format(b, 's')]);
    }
    case 'gates':
      return result('Đồng hồ bắt đầu khi xe qua cổng 1 và dừng ở cổng 2.',
        ['Thời gian giữa hai cổng', format(v.distance / v.speed, 's')], ['Tốc độ tính được', format(v.speed, 'm/s')]);
    case 'graph':
      return result('Đoạn từ giây 4 đến giây 6 nằm ngang. Xe đứng yên ở cùng một vị trí.',
        ['Quãng đường sau 4 s', format(4 * v.speed, 'm')], ['Quãng đường sau 10 s', format(4 * (v.speed + v.other), 'm')]);
    case 'braking': {
      const { reaction, braking } = carSettings(v);
      return result(reaction + braking <= 40 ? 'Mô hình cho thấy xe dừng trước hoặc tại vạch.' : 'Xe vượt vạch trước khi dừng.',
        ['Đi trong 1 s phản ứng', format(reaction, 'm')], ['Đi khi phanh', format(braking, 'm')], ['Tổng quãng đường dừng', format(reaction + braking, 'm')]);
    }
    case 'sound':
      return result(v.medium ? 'Màng loa vẫn dao động. Chân không không truyền được sóng âm.' : 'Vùng nén dịch về bên phải. Các phần tử chỉ dao động quanh vị trí ban đầu.',
        ['Xung tới tai', v.medium ? 'Không' : 'Có']);
    case 'pitch':
      return result('Biên độ lớn hơn làm nét sóng cao hơn. Tần số lớn hơn làm các đỉnh gần nhau hơn trên cùng trục thời gian.',
        ['Biên độ tương đối', format(v.amplitude)], ['Số chu kì trong 10 ms', format(v.frequency / 100)]);
    case 'echo': {
      const time = v.distance * 2 / 340;
      return result(v.surface ? 'Rèm hấp thụ nhiều âm hơn. Xung quay lại yếu hơn.' : 'Tường cứng phản xạ mạnh. Xung quay lại sau khi đi hai lần khoảng cách.',
        ['Thời gian âm đi và về', format(time, 's', 3)], ['Âm phản xạ tương đối', v.surface ? 'Yếu' : 'Mạnh']);
    }
    case 'shadow': {
      const magnification = 90 / v.distance;
      const center = 14 * magnification;
      const spread = v.source ? 8 * (magnification - 1) : 0;
      return result(v.source ? 'Một phần nguồn còn chiếu tới hai dải nửa tối.' : 'Nguồn nhỏ cho bóng tối rõ rìa trong mô hình.',
        ['Bề rộng vùng tối', format(Math.max(0, center - spread), 'cm')], ['Cả vùng tối và nửa tối', format(center + spread, 'cm')]);
    }
    case 'reflection':
      return result(v.angle ? 'Tia tới và tia phản xạ đối xứng qua pháp tuyến.' : 'Tia phản xạ đi ngược lại trên đường của tia tới.',
        ['Góc tới', format(v.angle, '°')], ['Góc phản xạ', format(v.angle, '°')]);
    case 'mirror':
      return result('Ảnh đứng thẳng, cùng cao với vật và đối xứng qua mặt gương.',
        ['Từ ảnh đến gương', format(v.distance, 'cm')], ['Từ vật đến ảnh', format(2 * v.distance, 'cm')], ['Chiều cao ảnh', format(v.height, 'cm')]);
    case 'magnet':
      return result(v.sample === 0 ? 'Hai cực Bắc đẩy nhau.' : v.sample === 1 ? 'Hai cực khác tên hút nhau.' : v.sample === 2
        ? 'Sắt bị nam châm hút.' : 'Mẫu hầu như không dịch chuyển trong phép thử.', ['Quan sát', ['Đẩy', 'Hút', 'Hút', 'Không rõ', 'Không rõ'][v.sample]]);
    case 'compass':
      return result('Đầu Bắc của kim chỉ theo tiếp tuyến của đường sức tại chỗ đặt la bàn.',
        ['Hướng đầu Bắc trên hình', ['Sang phải', 'Sang trái', 'Sang phải', 'Chếch lên về bên phải'][v.place]]);
    case 'coil':
      return result(v.closed ? 'Kẹp giấy bị hút lên phía lõi. Với cùng dòng điện, nhiều vòng làm tác dụng từ mạnh hơn trong mô hình.' : 'Dòng điện đã ngắt, kẹp giấy nằm lại trên khay.',
        ['Tác dụng từ tương đối', !v.closed ? 'Tắt' : v.turns >= 30 ? 'Mạnh hơn' : 'Có']);
    case 'density': {
      const density = [7.8, 2.7, 8.9][v.material];
      return result('Chia số chỉ cân cho thể tích của mẫu để được khối lượng riêng.',
        ['Số chỉ cân', format(density * v.volume, 'g')], ['Thể tích', format(v.volume, 'cm³')], ['m/V', format(density, 'g/cm³')]);
    }
    case 'densitypractice':
      if (v.sample === 0) return result('Dùng thước đo ba chiều. Thể tích khối hộp bằng tích ba kích thước.',
        ['Ba kích thước', '5 × 4 × 2 cm'], ['Thể tích', '40 cm³'], ['Khối lượng', '26 g']);
      if (v.sample === 1) return result('Lấy số chỉ cân chứa nước trừ số chỉ bình rỗng.',
        ['Cân bình rỗng', '42 g'], ['Cân bình chứa nước', '92 g'], ['Vạch thể tích', '50 mL']);
      return result('Mực nước dâng đúng bằng thể tích phần sỏi chìm hoàn toàn.',
        ['Cân sỏi khô', '48 g'], ['Trước khi nhúng', format(v.level, 'mL')], ['Sau khi nhúng', format(v.level + 20, 'mL')]);
    case 'weights': {
      const moment = weightMoment(v);
      return result(Math.abs(moment) < .001 ? 'Tổng moment bằng 0, thanh vẫn nằm ngang.' : moment < 0 ? 'Phía A và B hạ xuống.' : 'Phía C hạ xuống.',
        ['Moment phía A, B', format((20 * v.A + 10 * v.B) * .02, 'N·m')], ['Moment phía C', format(.4 * v.C, 'N·m')]);
    }
    case 'scale':
      return result('Lực kế kéo đầu phải xuống để giữ thanh ngang. Lực kế càng xa O, số chỉ cân bằng càng nhỏ.',
        ['Lỗ móc', format(v.arm, 'cm')], ['Số chỉ lực kế', format(scaleForce(v.arm), 'N')]);
    case 'static':
      return result(['Hai vật tích điện cùng dấu đẩy nhau.', 'Hai vật tích điện trái dấu hút nhau.',
        'Điện tích trong giấy phân bố lại, phía gần vật mang điện bị hút mạnh hơn.'][v.sample],
        ['Quan sát', v.sample === 0 ? 'Đẩy' : 'Hút']);
    case 'conductors':
    case 'circuit':
      return result(isClosed(model, v) ? 'Mạch có đường dẫn kín từ nguồn qua bóng và trở về nguồn.' :
        'Đường dẫn qua bóng bị ngắt hoặc vật thử cách điện.', ['Bóng đèn', isClosed(model, v) ? 'Sáng' : 'Tắt']);
    case 'effects':
      return result(v.closed ? ['Dây nung nóng lên.', 'Bóng đèn phát sáng.', 'Đồng bám dần lên điện cực âm.'][v.sample]
        : 'Mạch hở nên dấu hiệu do dòng điện biến mất.', ['Tác dụng nổi bật', v.closed ? ['Nhiệt', 'Phát sáng', 'Hóa học'][v.sample] : 'Chưa quan sát thấy']);
    case 'meters':
      if (v.meter) return result(v.meter === 1 ? 'Ampe kế mắc ngang tải có thể làm đoản mạch. Dừng phép đo.'
        : 'Vôn kế mắc nối tiếp làm dòng điện qua tải rất nhỏ. Mắc lại vôn kế song song.', ['Phép đo', 'Cách mắc sai']);
      return result('Ampe kế nối tiếp tải. Vôn kế nối vào hai đầu tải.',
        ['Ampe kế', format(v.voltage / 10, 'A')], ['Vôn kế', format(v.voltage, 'V')]);
    case 'meterlab':
      return result(v.polarity ? 'Khi đảo cực, ampe kế số trong mô hình hiện dấu âm. Đổi lại hai đầu đo.'
        : 'Cả hai dụng cụ mắc đúng cực, số chỉ đều dương.', ['Ampe kế số', format(v.voltage / 10 * (v.polarity ? -1 : 1), 'A')], ['Vôn kế', format(v.voltage, 'V')]);
    case 'particles':
      return result('Trong cùng một chất, vật ở nhiệt độ cao hơn có chuyển động nhiệt mạnh hơn.',
        ['Nhiệt độ', format(v.temp, '°C')]);
    case 'heat':
      return result(v.power ? ['Nhiệt truyền dọc thanh từ đầu nóng sang đầu lạnh.', 'Nước nóng dâng lên, phần mát hơn đi xuống.',
        'Năng lượng đi từ nguồn bức xạ tới vật nhận qua khoảng trống.'][v.mode] : 'Nguồn đang tắt, mô hình chưa có phần nhiệt do nguồn cung cấp.',
        ['Cách truyền chính', ['Dẫn nhiệt', 'Đối lưu', 'Bức xạ'][v.mode]]);
    case 'expansion':
      return result('Vạch đứt chỉ kích thước ban đầu. Hình phóng đại độ nở để dễ quan sát.',
        [v.sample === 0 ? 'Độ tăng chiều dài' : 'Độ tăng thể tích', format(expansion(v), v.sample === 0 ? 'mm' : 'mL', 3)]);
    case 'joule':
      return result('Mô hình coi toàn bộ năng lượng bộ đun cung cấp làm nóng nước, bỏ qua thất thoát.',
        ['Joulemeter', format(jouleTime(v), 'J')], ['Nhiệt độ cuối', format(22 + temperatureRise(v), '°C')], ['Nhiệt độ tăng', format(temperatureRise(v), '°C')]);
    default:
      throw new Error('Thiếu mô hình: ' + model);
  }
}
