// type Row = {
//   user_id: string;
//   email: string | null;
//   display_name: string | null;
//   avatar_url: string | null;
//   created_at: string;
//   roles: string[];
// };


import { createFileRoute } from "@tanstack/react-router";
import { Users, ShieldOff, Search } from "lucide-react";
import Button from "@mui/material/Button";

export const Route = createFileRoute("/admin/administrator")({
  component: AdminUsers,
});

function AdminUsers() {
  return (
    // Thay đổi 1: Bỏ max-w-6xl để bảng giãn rộng toàn màn hình
    <div className="p-8 w-full">
      <header className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Users className="h-4 w-4" /> Admin
          </div>
          <h1 className="font-display text-3xl font-bold mt-1">Người dùng</h1>
        </div>
      </header>

      {/* Tăng max-w-sm lên max-w-md để ô tìm kiếm cân đối hơn */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          className="w-full pl-10 pr-4 py-2 border rounded-md border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Tìm theo email hoặc tên..."
        />
      </div>

      {/* Thay đổi 2: Container bảng rộng và căn chỉnh cột */}
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="text-left font-medium px-6 py-4">Email</th>
              <th className="text-left font-medium px-6 py-4">Họ và tên</th>
              <th className="text-left font-medium px-6 py-4">Role</th>
              <th className="text-left font-medium px-6 py-4">Quyền</th>
              <th className="text-left font-medium px-6 py-4">ID người tạo</th>
              <th className="text-left font-medium px-6 py-4">Ngày tạo</th>
              <th className="text-right font-medium px-6 py-4">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium">admin@example.com</td>
                <td className="px-6 py-4 font-medium">Nugyen Van Minh Giang</td>
                <td className="px-6 py-4 text-muted-foreground">admin</td>
                <td className="px-6 py-4 text-muted-foreground">log</td>
                <td className="px-6 py-4 text-muted-foreground">1</td>
                <td className="px-6 py-4 text-muted-foreground">
                    {new Date().toLocaleDateString("vi-VN")}
                </td>
                {/* Thay đổi 3: Thu gọn nút hành động cho vừa vặn */}
                <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                    <Button 
                        variant="outlined" 
                        color="error" 
                        size="small"
                        sx={{ textTransform: 'none', gap: 1 }}
                    >
                        <ShieldOff className="h-4 w-4" /> Xóa
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        size="small"
                        sx={{ textTransform: 'none', gap: 1 }}
                    >
                        <ShieldOff className="h-4 w-4" /> Xóa
                    </Button>
                    </div>
                </td>
            </tr>

            <tr className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium">admin@example.com</td>
                <td className="px-6 py-4 font-medium">None</td>
                <td className="px-6 py-4 text-muted-foreground">admin</td>
                <td className="px-6 py-4 text-muted-foreground">log</td>
                <td className="px-6 py-4 text-muted-foreground">1</td>
                <td className="px-6 py-4 text-muted-foreground">
                    {new Date("2021-10-21").toLocaleDateString("vi-VN")}
                </td>
                {/* Thay đổi 3: Thu gọn nút hành động cho vừa vặn */}
                <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                    <Button 
                        variant="outlined" 
                        color="error" 
                        size="small"
                        sx={{ textTransform: 'none', gap: 1 }}
                    >
                        <ShieldOff className="h-4 w-4" /> Xóa
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        size="small"
                        sx={{ textTransform: 'none', gap: 1 }}
                    >
                        <ShieldOff className="h-4 w-4" /> Xóa
                    </Button>
                    </div>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}