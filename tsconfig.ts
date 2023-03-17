{
	"extends": "expo/tsconfig.base",
	"compilerOptions": {
		"strict": true,
		"baseUrl": "./",
		"paths": {
			"@dtos/*": ["src/dtos/*"],
			"@assets/*": ["./src/assets/*"],
			"@components/*": ["./src/components/*"],
			"@screens/*": ["./src/screens/*"],
			"@storage/*": ["./src/storage/*"],
			"@utils/*": ["./src/utils/*"],
			"@services/*": ["./src/services/*"],
			"@hooks/*": ["./src/hooks/*"],
			"@contexts/*": ["./src/contexts/*"],
			"@routes/*": ["./src/routes/*"]
		}
	}
}