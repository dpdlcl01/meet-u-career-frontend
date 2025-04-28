"use client";

interface CreatePostInputProps {
  onOpen: () => void;
}

export const CreatePostInput = ({ onOpen }: CreatePostInputProps) => {
  return (
    <div className="bg-white rounded-md p-4 mb-4">
      <div
        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md focus:outline-none"
        onClick={onOpen}
        tabIndex={0}
        contentEditable={false}
      >
        <img
          src="https://meet-u-storage.s3.ap-northeast-2.amazonaws.com/static/etc/profile.png"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="text-gray-400 text-sm select-none">
          나누고 싶은 생각을 공유해보세요!
        </div>
      </div>
    </div>
  );
};
