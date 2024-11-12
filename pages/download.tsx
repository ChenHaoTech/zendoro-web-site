import React from 'react';

// 类型定义
type StoreButtonProps = {
    type: 'microsoft' | 'apple' | 'google';
    className?: string;
};

type CardProps = {
    children: React.ReactNode;
    className?: string;
};

// 图标组件
const IconDownload = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const IconMonitor = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
);

const IconApple = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
        <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
);

const IconSmartphone = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
    </svg>
);

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
        {children}
    </div>
);

const StoreButton: React.FC<StoreButtonProps> = ({ type, className = '' }) => {
    // Store button content based on type
    const content = {
        microsoft: (
            <div className="flex items-center justify-center bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all">
                <div className="mr-3">
                    <IconMonitor />
                </div>
                
                <div className="text-left">
                    <div className="text-xs">Get it from</div>
                    <div className="text-sm font-semibold">Microsoft Store</div>
                </div>
            </div>
        ),
        apple: (
            <div className="flex items-center justify-center bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all">
                <div className="mr-3">
                    <IconApple />
                </div>
                <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                </div>
            </div>
        ),
        google: (
            <div className="flex items-center justify-center bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all">
                <div className="mr-3">
                    <IconSmartphone />
                </div>
                <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                </div>
            </div>
        )
    };

    return (
        <button className={`w-full mb-2 ${className}`}>
            {content[type]}
        </button>
    );
};

const DownloadPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">下载我们的应用</h1>
                    <p className="text-lg text-gray-600">选择您的设备平台开始下载</p>
                </div>

                {/* Download Cards Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Windows */}
                    <Card className="group hover:shadow-xl transition-shadow duration-300">
                        <div className="p-6">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                                    <IconMonitor />
                                </div>
                                <h2 className="text-xl font-semibold mb-2">Windows 版本</h2>
                                <p className="text-sm text-gray-500 mb-4">支持 Windows 10/11</p>
                                <StoreButton type="microsoft" />
                                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2">
                                    <IconDownload />
                                    直接下载安装包
                                </button>
                                <p className="text-xs text-gray-400 mt-2">版本 2.1.0</p>
                            </div>
                        </div>
                    </Card>

                    {/* Apple (iOS & macOS) */}
                    <Card className="group hover:shadow-xl transition-shadow duration-300">
                        <div className="p-6">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                                    <IconApple />
                                </div>
                                <h2 className="text-xl font-semibold mb-2">Apple 设备</h2>
                                <p className="text-sm text-gray-500 mb-4">支持 iOS 14.0+ / macOS 11.0+</p>
                                <StoreButton type="apple" />
                                <div className="flex gap-2 text-sm text-gray-500 justify-center mt-4">
                                    <span className="px-2 py-1 bg-gray-100 rounded">iPhone</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded">iPad</span>
                                    <span className="px-2 py-1 bg-gray-100 rounded">Mac</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">版本 2.1.0</p>
                            </div>
                        </div>
                    </Card>

                    {/* Android */}
                    <Card className="md:col-span-2 group hover:shadow-xl transition-shadow duration-300">
                        <div className="p-6">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                                    <IconSmartphone />
                                </div>
                                <h2 className="text-xl font-semibold mb-2">Android 版本</h2>
                                <p className="text-sm text-gray-500 mb-4">支持 Android 8.0+</p>
                                <StoreButton type="google" />
                                <p className="text-xs text-gray-400 mt-2">版本 2.1.0</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-center text-gray-600">
                    <p className="mb-2">遇到问题? 联系我们的技术支持</p>
                    <p className="text-sm">support@example.com</p>
                </div>
            </div>
        </div>
    );
};

export default DownloadPage;