// components/dashboard/StatsCard.js
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { CalendarToday, Assignment } from "@mui/icons-material";

function StatsCard({ name, email, role, profileImage, createdAt, tasks = [] }) {
  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const inworkCount = tasks.filter((t) => t.status === "inwork").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  const total = tasks.length || 1;
  const pendingPercent = (pendingCount / total) * 100;
  const inworkPercent = (inworkCount / total) * 100;
  const completedPercent = (completedCount / total) * 100;

  return (
    <Card
      sx={{
        maxWidth: 400,
        borderRadius: 4,
        boxShadow: "0 8px 20px rgba(79,70,229,0.25)",
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.7)",
        border: "1px solid rgba(79,70,229,0.2)",
        overflow: "visible",
        position: "relative",
        pt: 6,
      }}
    >
      {/* Floating Avatar */}
      <Box
        sx={{
          position: "absolute",
          top: -40,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Avatar
          src={profileImage || "https://via.placeholder.com/100"}
          sx={{
            width: 80,
            height: 80,
            border: "4px solid #4F46E5",
            boxShadow: "0 4px 12px rgba(79,70,229,0.4)",
          }}
        />
      </Box>

      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4F46E5", textAlign: "center" }}>
            {name}
          </Typography>
        }
        subheader={
          <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
            {email}
          </Typography>
        }
        action={
          <Chip
            label={role}
            sx={{
              bgcolor: role === "admin" ? "rgba(79,70,229,0.1)" : "rgba(34,197,94,0.1)",
              color: role === "admin" ? "#4F46E5" : "#22C55E",
              fontWeight: "bold",
            }}
          />
        }
        sx={{ textAlign: "center" }}
      />

      <CardContent sx={{ textAlign: "center", mt: 2 }}>
        {formattedDate && (
          <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={1}>
            <CalendarToday fontSize="small" sx={{ color: "#4F46E5" }} />
            <Typography variant="body2">
              Joined: <strong>{formattedDate}</strong>
            </Typography>
          </Box>
        )}

        <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
          <Assignment fontSize="small" sx={{ color: "#4F46E5" }} />
          <Typography variant="body2">
            Total Tasks: <strong>{tasks.length > 0 ? tasks.length : "No tasks assigned"}</strong>
          </Typography>
        </Box>

        {/* Status Breakdown */}
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold", color: "#4F46E5" }}>
          Status Breakdown
        </Typography>
        <Box sx={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", bgcolor: "grey.200" }}>
          <Box sx={{ width: `${pendingPercent}%`, bgcolor: "error.main" }} />
          <Box sx={{ width: `${inworkPercent}%`, bgcolor: "warning.main" }} />
          <Box sx={{ width: `${completedPercent}%`, bgcolor: "success.main" }} />
        </Box>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="caption" color="error">Pending: {pendingCount}</Typography>
          <Typography variant="caption" color="warning.main">Inwork: {inworkCount}</Typography>
          <Typography variant="caption" color="success.main">Completed: {completedCount}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatsCard;