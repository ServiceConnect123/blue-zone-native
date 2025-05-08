import { FontAwesome } from "@expo/vector-icons";

export default function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}