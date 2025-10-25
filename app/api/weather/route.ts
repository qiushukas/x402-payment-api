import { NextResponse } from 'next/server';

// 模拟天气 API 端点（演示用途）
// 在生产环境中，您应该连接到真实的天气 API 服务
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const units = searchParams.get('units') || 'fahrenheit';

  if (!location) {
    return NextResponse.json(
      { error: 'Location parameter is required' },
      { status: 400 }
    );
  }

  // 模拟天气数据
  const weatherData = generateMockWeather(location, units as string);

  return NextResponse.json(weatherData);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { location, units = 'fahrenheit' } = body;

    if (!location) {
      return NextResponse.json(
        { error: 'Location is required in request body' },
        { status: 400 }
      );
    }

    const weatherData = generateMockWeather(location, units);

    return NextResponse.json(weatherData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }
}

// 生成模拟天气数据
function generateMockWeather(location: string, units: string) {
  // 模拟不同城市的天气
  const conditions = ['sunny', 'cloudy', 'partly cloudy', 'rainy', 'overcast'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  
  // 根据单位生成温度
  let temperature: number;
  if (units === 'celsius') {
    temperature = Math.floor(Math.random() * 30) + 5; // 5-35°C
  } else {
    temperature = Math.floor(Math.random() * 60) + 40; // 40-100°F
  }

  const humidity = Math.floor(Math.random() * 60) + 30; // 30-90%

  return {
    location: location,
    temperature: temperature,
    conditions: randomCondition,
    humidity: humidity,
    units: units,
    timestamp: new Date().toISOString(),
    // 额外的有用信息
    feelsLike: temperature + (Math.random() > 0.5 ? 2 : -2),
    windSpeed: Math.floor(Math.random() * 20) + 5,
    visibility: Math.floor(Math.random() * 10) + 5,
  };
}

