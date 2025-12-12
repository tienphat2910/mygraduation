"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Ngày tốt nghiệp 19/12/2025 lúc 07:30
  const graduationDate = new Date("2025-12-19T07:30:00");

  useEffect(() => {
    // Scroll to top and clear cache on page load
    window.scrollTo(0, 0);

    // Clear any cached states
    if (typeof window !== "undefined") {
      sessionStorage.clear();

      // Prevent browser from restoring scroll position
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    }

    // Loading animation
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = graduationDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Generate calendar for December 2025
  const getDaysInMonth = () => {
    const year = 2025;
    const month = 11; // December (0-indexed)

    // Get current date in Vietnam timezone (UTC+7)
    const vietnamTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    );
    const today = vietnamTime.getDate();
    const currentMonth = vietnamTime.getMonth();
    const currentYear = vietnamTime.getFullYear();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add all days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // Only highlight today if it's December 2025
    const isCurrentMonth = currentMonth === 11 && currentYear === 2025;
    return { days, today: isCurrentMonth ? today : null };
  };

  const calendar = getDaysInMonth();

  return (
    <>
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Gallery"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl transition-colors"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100"
          >
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-8xl mb-4"
              >
                🎓
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold text-gray-800"
                style={{ fontFamily: "MotherLand, cursive" }}
              >
                Nguyễn Thị Thanh Tuyền
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4 flex gap-2 justify-center"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-3 h-3 bg-rose-400 rounded-full"
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 overflow-x-hidden">
        {/* Hero Section - Cover Image with Name */}
        <section className="relative min-h-screen flex items-end justify-center">
          {/* Cover Image Background */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={
              !loading ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }
            }
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="absolute inset-0 bg-gray-200 overflow-hidden"
          >
            <Image
              src="/images/3.jpg"
              alt="Graduation Cover"
              fill
              className="object-cover object-[center_35%] md:object-[center_76.5%]"
              priority
            />
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative z-10 text-center px-4 pb-16 md:pb-24 w-full"
          >
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-loose md:leading-tight"
              style={{ fontFamily: "MotherLand, cursive" }}
            >
              Nguyễn Thị Thanh Tuyền
            </h1>

            <div className="text-xl md:text-2xl lg:text-3xl text-white/90 tracking-widest space-y-2">
              <div>GRADUATION CEREMONY</div>
              <div>19/12/2025</div>
            </div>
          </motion.div>
        </section>

        {/* Thank You Message Section */}
        <section className="py-16 px-4 bg-white/50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-700 leading-relaxed italic"
            >
              “Mong những lời chúc phúc của bạn ngày chia tay là chiếc ô che
              nắng, che mưa cho tôi vượt mọi chông gai đời người”
            </motion.p>
          </motion.div>
        </section>

        {/* Graduate Info Section - 2 columns */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left - Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="w-full aspect-square rounded-2xl bg-gray-200 overflow-hidden shadow-xl relative">
                  <Image
                    src="/images/2.jpg"
                    alt="Thanh Tuyền"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* Right - Text */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-4 text-center"
              >
                <h2 className="text-3xl md:text-4xl font-medium text-gray-800">
                  TÂN CỬ NHÂN
                </h2>
                <h3
                  className="text-2xl md:text-3xl text-gray-700"
                  style={{ fontFamily: "MotherLand, cursive" }}
                >
                  Thanh Tuyền
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed text-justify pt-4">
                  🎓🎓🎓 Chúng ta không nói lời kết thúc, mà đang cùng nhau mở
                  ra một chương mới đầy hy vọng. Giữa sân trường nhuộm ánh nắng,
                  những gương mặt trong tà áo tốt nghiệp tỏa sáng như níu giữ cả
                  một bầu trời thanh xuân: những buổi sáng vội vã chạy vào lớp,
                  những giờ học dốc hết tâm trí, những lần cùng nhau vượt qua áp
                  lực và cả những ước mơ nhỏ bé dần hình thành. <br /> <br />
                  Hôm nay, đứng cạnh nhau không chỉ tạo nên một bức ảnh đẹp — mà
                  còn lưu giữ dấu ấn của một hành trình mà mỗi chúng ta đã dồn
                  hết trái tim mình. Trong cái siết tay thật chặt, trong nụ cười
                  rạng rỡ của ngày cuối cùng ấy, là niềm tự hào, là biết ơn và
                  cả chút lưu luyến với những tháng năm không thể lặp lại.
                  <br /> <br /> Lễ tốt nghiệp chỉ đơn thuần là một điểm dừng
                  thật đẹp để ta nhìn lại và tự tin tiến về phía trước. Mỗi
                  người sẽ mang theo ký ức này như một hành trang nhẹ nhàng
                  nhưng bền vững, để bước vào những chặng đường lớn hơn, dài hơn
                  và rực rỡ hơn.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Invitation Section */}
        <section className="py-16 px-4 bg-white/50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto text-center"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 motion-text"
              style={{ fontFamily: "MotherLand, cursive" }}
            >
              THÂN MỜI
            </h2>
            <p className="text-lg md:text-xl text-bisque-700 mb-8 uppercase">
              Mọi người đến dự lễ tốt nghiệp
            </p>

            {/* Gallery */}
            <div className="flex items-center justify-center gap-2 md:gap-4">
              {/* Left Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                onClick={() => setSelectedImage("/images/1.jpg")}
                className="w-32 h-44 md:w-48 md:h-64 rounded-xl bg-gray-200 overflow-hidden shadow-lg relative cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src="/images/1.jpg"
                  alt="Gallery 1"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Center Image - Larger */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                onClick={() => setSelectedImage("/images/2.jpg")}
                className="w-40 h-52 md:w-60 md:h-80 rounded-xl bg-gray-200 overflow-hidden shadow-2xl relative cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src="/images/2.jpg"
                  alt="Gallery 2"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                onClick={() => setSelectedImage("/images/3.jpg")}
                className="w-32 h-44 md:w-48 md:h-64 rounded-xl bg-gray-200 overflow-hidden shadow-lg relative cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src="/images/3.jpg"
                  alt="Gallery 3"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Calendar Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, margin: "-50px", amount: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8 motion-text"
              style={{ fontFamily: "MotherLand, cursive" }}
            >
              Tháng 12
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="max-w-3xl mx-auto"
            >
              <div className="grid grid-cols-7 gap-3 md:gap-4">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center font-bold text-rose-500 text-xs md:text-sm uppercase tracking-wider py-3"
                    >
                      {day}
                    </div>
                  )
                )}

                {calendar.days.map((day, index) => (
                  <div
                    key={index}
                    className={`
                    aspect-square flex items-center justify-center rounded-xl text-base md:text-lg font-medium transition-all duration-300
                    ${
                      !day
                        ? ""
                        : day === 19
                        ? "bg-rose-500 text-white font-bold relative overflow-visible shadow-lg scale-110"
                        : day === calendar.today
                        ? "bg-rose-100 text-rose-600 font-semibold shadow-md"
                        : "bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md hover:scale-105"
                    }
                  `}
                  >
                    {day}
                    {day === 19 && (
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [-5, 5, -5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -top-6 text-2xl"
                      >
                        🎓
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Event Details Section */}
        <section className="py-16 px-4 bg-white/50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2
              className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 uppercase"
              style={{ color: "rgb(222,184,135)" }}
            >
              Lễ tốt nghiệp được tổ chức vào lúc <br></br>10 giờ 30 phút
            </h2>

            <div
              className="text-2xl md:text-3xl lg:text-4xl font-500 mb-8"
              style={{ color: "rgb(222,184,135)" }}
            >
              Ngày 19 | Tháng 12 | Năm 2025
            </div>

            {/* Divider */}
            <div className="w-full max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mb-8"></div>

            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              Trường Đại học Tài chính - Marketing
            </h3>

            <p className="text-gray-600 mb-6">
              306 Võ Văn Hát, Long Trường, Thủ Đức, Thành phố Hồ Chí Minh
            </p>

            <a
              href="https://maps.app.goo.gl/NNG5dFqN37V7Lmps5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors shadow-lg"
            >
              <MapPin className="w-5 h-5" />
              Chỉ đường
            </a>
          </motion.div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12 motion-text"
              style={{ fontFamily: "MotherLand, cursive" }}
            >
              Sự kiện quan trọng
            </motion.h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-rose-200"></div>

              {[
                { time: "07:30", event: "Làm lễ ở hội trường" },
                { time: "10:30", event: "Chung vui và chụp ảnh" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`relative mb-12 md:mb-16 ${
                    index % 2 === 0
                      ? "md:pr-1/2 md:text-right"
                      : "md:pl-1/2 md:ml-auto"
                  } md:w-1/2`}
                >
                  <div className="flex items-center gap-4 md:gap-0">
                    {/* Mobile timeline dot */}
                    <div className="md:hidden w-8 h-8 rounded-full bg-rose-500 border-4 border-white shadow-lg flex items-center justify-center flex-shrink-0"></div>

                    <div
                      className={`flex-1 ${
                        index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                      }`}
                    >
                      <div className="text-2xl md:text-3xl font-medium text-rose-500 mb-2">
                        {item.time}
                      </div>
                      <div className="text-lg text-gray-700">{item.event}</div>
                    </div>

                    {/* Desktop timeline dot */}
                    <div
                      className={`hidden md:block absolute w-8 h-8 rounded-full bg-rose-500 border-4 border-white shadow-lg ${
                        index % 2 === 0
                          ? "right-0 translate-x-1/2"
                          : "left-0 -translate-x-1/2"
                      }`}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center text-lg md:text-xl text-gray-700 italic mt-12"
            >
              Sự hiện diện của bạn là niềm vinh hạnh cho buổi lễ tốt nghiệp của
              mình!
            </motion.p>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="py-16 px-4 bg-white/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Time Box with Border */}
              <div className="border-4 border-rose-400 rounded-2xl p-8 md:p-12 bg-white shadow-xl">
                {/* Header with decorative lines */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-px bg-rose-400 flex-1"></div>
                  <h2
                    className="text-3xl md:text-4xl font-bold text-gray-800 px-4 motion-text"
                    style={{ fontFamily: "MotherLand, cursive" }}
                  >
                    Time
                  </h2>
                  <div className="h-px bg-rose-400 flex-1"></div>
                </div>

                {/* Countdown Display */}
                <div
                  className="flex items-center justify-center gap-2 md:gap-4 text-3xl md:text-4xl lg:text-5xl font-bold text-rose-500"
                  style={{ fontFamily: "MotherLand, cursive" }}
                >
                  <span>{String(timeLeft.days).padStart(2, "0")}</span>
                  <span className="text-gray-400">:</span>
                  <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                  <span className="text-gray-400">:</span>
                  <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
                  <span className="text-gray-400">:</span>
                  <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Thank You Section */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2
              className="text-5xl md:text-7xl font-bold text-gray-800 motion-text"
              style={{
                fontFamily: "MotherLand, cursive",
                transform: "translateZ(0)"
              }}
            >
              Thank You
            </h2>
          </motion.div>
        </section>
      </div>
    </>
  );
}
